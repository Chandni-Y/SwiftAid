import math
from routing import get_route
from data_store import VEHICLES


def distance(lat1, lon1, lat2, lon2):
    return math.sqrt(
        (lat1 - lat2) ** 2 +
        (lon1 - lon2) ** 2
    )


def find_nearest_vehicle(lat, lon, vehicle_type):

    candidates = []

    # Stage 1: quick distance filter
    for v in VEHICLES:

        if v["type"] != vehicle_type:
            continue

        if v["status"] != "available":
            continue

        d = distance(lat, lon, v["lat"], v["lon"])

        candidates.append((d, v))

    if not candidates:
        return None

    # take 5 closest
    candidates.sort(key=lambda x: x[0])
    candidates = candidates[:5]

    best_vehicle = None
    best_eta = float("inf")

    # Stage 2: accurate routing
    for _, v in candidates:

        routes = get_route(
            v["lat"],
            v["lon"],
            lat,
            lon
        )

        if not routes:
            continue

        eta = routes[0]["eta"]

        if eta < best_eta:
            best_eta = eta
            best_vehicle = v

    if best_vehicle:

        best_vehicle["status"] = "busy"

        if "incident_id" not in best_vehicle:
            best_vehicle["incident_id"] = None

    return best_vehicle