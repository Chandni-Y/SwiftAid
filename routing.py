import osmnx as ox
import networkx as nx
from data_store import G, SIGNALS, SIGNAL_TREE
from traffic_model import get_congestion_factor


# Convert MultiDiGraph → DiGraph
if isinstance(G, nx.MultiDiGraph):
    G = nx.DiGraph(G)


AMBULANCE_SPEED = 15
MAX_SIGNAL_TIME = 90
PREEMPTION_TIME = 20


def calculate_edge_time(G, u, v, data):

    distance = data.get("length", 0)

    highway = data.get("highway", "residential")

    if isinstance(highway, list):
        highway = highway[0]

    speed_table = {
        "motorway": 110,
        "trunk": 100,
        "primary": 80,
        "secondary": 60,
        "tertiary": 40,
        "residential": 25
    }

    maxspeed = data.get("maxspeed")

    if maxspeed:
        try:
            speed = float(str(maxspeed).split()[0])
        except:
            speed = speed_table.get(highway, 30)
    else:
        speed = speed_table.get(highway, 30)

    speed = speed * 1000 / 3600

    travel_time = distance / speed

    congestion_factor = get_congestion_factor(highway)

    travel_time = travel_time * congestion_factor

    data["traffic_factor"] = congestion_factor

    delay = 0

    if G.nodes[v].get("highway") == "traffic_signals":
        delay = 20

    return travel_time + delay


# assign travel time to edges
for u, v, data in G.edges(data=True):
    data["travel_time"] = calculate_edge_time(G, u, v, data)


def get_route(start_lat, start_lon, end_lat, end_lon):

    origin = ox.distance.nearest_nodes(G, start_lon, start_lat)
    destination = ox.distance.nearest_nodes(G, end_lon, end_lat)

    try:
        paths_generator = nx.shortest_simple_paths(
            G,
            origin,
            destination,
            weight="travel_time"
        )
    except:
        return None

    route_paths = []

    # only get first two routes
    for _ in range(2):
        try:
            route_paths.append(next(paths_generator))
        except StopIteration:
            break

    routes_output = []

    for route in route_paths:

        coordinates = []
        signals = []
        seen_signals = set()

        total_distance = 0

        for i, node in enumerate(route):

            point = G.nodes[node]

            lat = point["y"]
            lon = point["x"]

            coordinates.append({
                "lat": lat,
                "lon": lon
            })

            if i > 0:

                prev = route[i - 1]

                edge = G.get_edge_data(prev, node)

                if edge:
                    total_distance += edge.get("length", 0)

            # SIGNAL ETA CALCULATION
            if SIGNAL_TREE:

                nearby = SIGNAL_TREE.query_ball_point([lat, lon], r=0.001)

                for idx in nearby:

                    signal = SIGNALS[idx]

                    signal_key = (
                        round(signal["lat"], 5),
                        round(signal["lon"], 5)
                    )

                    if signal_key in seen_signals:
                        continue

                    seen_signals.add(signal_key)

                    eta = total_distance / AMBULANCE_SPEED

                    if eta <= MAX_SIGNAL_TIME:

                        green_time = max(0, eta - PREEMPTION_TIME)

                        signals.append({
                            "lat": signal["lat"],
                            "lon": signal["lon"],
                            "eta": round(eta, 1),
                            "green_in": round(green_time, 1)
                        })

        eta_seconds = total_distance / AMBULANCE_SPEED

        routes_output.append({
            "route": coordinates,
            "signals": signals,
            "distance": round(total_distance, 1),
            "eta": round(eta_seconds, 1)
        })

    return routes_output


def reroute(current_lat, current_lon, dest_lat, dest_lon):

    origin = ox.distance.nearest_nodes(G, current_lon, current_lat)
    destination = ox.distance.nearest_nodes(G, dest_lon, dest_lat)

    route = nx.shortest_path(G, origin, destination, weight="travel_time")

    coordinates = []

    for node in route:

        point = G.nodes[node]

        coordinates.append({
            "lat": point["y"],
            "lon": point["x"]
        })

    return coordinates