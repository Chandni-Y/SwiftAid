import osmnx as ox
from data_store import G


def load_signals():

    print("Loading traffic signals from OSM...")

    tags = {
        "highway": "traffic_signals"
    }

    osm_signals = ox.features_from_place(
        "Indore, Madhya Pradesh, India",
        tags
    )

    signals = []

    # Real signals from OSM
    for _, row in osm_signals.iterrows():

        if row.geometry.geom_type == "Point":

            signals.append({
                "lat": row.geometry.y,
                "lon": row.geometry.x,
                "type": "real"
            })

    print(f"OSM signals loaded: {len(signals)}")

    # ------------------------------------------------
    # Detect major intersections
    # ------------------------------------------------

    print("Detecting intersections...")

    intersection_count = 0

    for node in G.nodes:

        neighbors = list(G.neighbors(node))

        if len(neighbors) >= 3:

            data = G.nodes[node]

            lat = data["y"]
            lon = data["x"]

            signals.append({
                "lat": lat,
                "lon": lon,
                "type": "intersection"
            })

            intersection_count += 1

    print(f"Intersections detected: {intersection_count}")

    print(f"Total signals loaded: {len(signals)}")

    return signals