from vehicle_selector import find_nearest_vehicle
from hospital_selector import find_nearest_hospital
from routing import get_route
from incident_manager import create_incident
import math


def clean_floats(obj):

    if isinstance(obj, float):
        if math.isnan(obj) or math.isinf(obj):
            return 0.0
        return obj

    if isinstance(obj, dict):
        return {k: clean_floats(v) for k, v in obj.items()}

    if isinstance(obj, list):
        return [clean_floats(v) for v in obj]

    return obj


# -----------------------
# VEHICLE RULES
# -----------------------

def get_required_vehicles(type, subtype):

    vehicles = []

    # MEDICAL CASES
    if type == "medical":

        if subtype in ["accident", "fight"]:
            vehicles = ["ambulance", "police"]

        elif subtype == "natural":
            vehicles = ["ambulance"]

        elif subtype == "fire":
            vehicles = ["ambulance", "fire_truck", "police"]

        else:
            vehicles = ["ambulance"]

    # FIRE CASES
    elif type == "fire":

        if subtype == "electrical":
            vehicles = ["fire_truck", "police"]

        elif subtype == "cylinder":
            vehicles = ["fire_truck", "ambulance", "police"]

        elif subtype == "people_trapped":
            vehicles = ["fire_truck", "ambulance", "police"]

        else:
            vehicles = ["fire_truck", "police"]

    # CRIME CASES
    elif type == "crime":

        if subtype == "fight":
            vehicles = ["police", "ambulance"]

        elif subtype == "robbery":
            vehicles = ["police"]

        elif subtype == "suspicious":
            vehicles = ["police"]

        else:
            vehicles = ["police"]

    return vehicles


# -----------------------
# MAIN DISPATCH
# -----------------------

def emergency_dispatch(lat, lon, type="medical", subtype=""):

    accident_lat = lat
    accident_lon = lon

    # Determine required vehicles
    required_vehicles = get_required_vehicles(type, subtype)

    if not required_vehicles:
        return {"error": "Invalid emergency type"}

    vehicles = []

    # Find nearest vehicles
    for vtype in required_vehicles:

        v = find_nearest_vehicle(
            accident_lat,
            accident_lon,
            vtype
        )

        if v:
            vehicles.append(v)

    if len(vehicles) == 0:
        return {"error": "No emergency vehicles available"}

    # Calculate routes to accident
    vehicle_routes = []

    for v in vehicles:

        route = get_route(
            v["lat"],
            v["lon"],
            accident_lat,
            accident_lon
        )

        if route:

            vehicle_routes.append({
                "vehicle": v,
                "route": route[0]
            })

    if len(vehicle_routes) == 0:
        return {"error": "No route found"}

    # Primary vehicle (for backward compatibility with MapView)
    primary = vehicle_routes[0]

    result = {
        "vehicles": vehicle_routes,

        # Compatibility fields for current frontend
        "vehicle": primary["vehicle"],
        "routes": [primary["route"]],
        "route_to_accident": primary["route"],

        "accident": {
            "lat": accident_lat,
            "lon": accident_lon
        }
    }

    hospital = None

    # -----------------------
    # HOSPITAL FOR MEDICAL
    # -----------------------

    if type == "medical":

        hospital = find_nearest_hospital(
            accident_lat,
            accident_lon
        )

        if hospital:

            route_to_hospital = get_route(
                accident_lat,
                accident_lon,
                hospital["lat"],
                hospital["lon"]
            )

            if route_to_hospital:

                result["hospital"] = hospital
                result["route_to_hospital"] = route_to_hospital[0]

                # add hospital route for drawing
                result["routes"].append(route_to_hospital[0])

    # -----------------------
    # CREATE INCIDENT
    # -----------------------

    incident = create_incident(
        accident_lat,
        accident_lon,
        type,
        vehicles[0],   # primary vehicle
        hospital
    )

    result["incident"] = incident

    # attach incident to all vehicles
    for v in vehicles:
        v["incident_id"] = incident["id"]

    return clean_floats(result)