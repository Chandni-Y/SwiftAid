import osmnx as ox
import networkx as nx
import math

from data_store import G, HOSPITALS


def haversine(lat1, lon1, lat2, lon2):

    R = 6371

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)

    a = (
        math.sin(dlat/2)**2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon/2)**2
    )

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

    return R * c


def find_nearest_hospital(lat, lon):

    hospitals_sorted = sorted(
        HOSPITALS,
        key=lambda h: haversine(lat, lon, h["lat"], h["lon"])
    )

    candidates = hospitals_sorted[:5]

    origin = ox.distance.nearest_nodes(G, lon, lat)

    best = None
    best_distance = float("inf")

    for hospital in candidates:

        dest = ox.distance.nearest_nodes(
            G,
            hospital["lon"],
            hospital["lat"]
        )

        route = nx.shortest_path(G, origin, dest, weight="cost")

        distance = 0

        for i in range(1, len(route)):
            edge = G.get_edge_data(route[i-1], route[i])[0]
            distance += edge["length"]

        if distance < best_distance:
            best_distance = distance
            best = hospital

    return best