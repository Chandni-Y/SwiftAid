import osmnx as ox

CITY = "Indore, Madhya Pradesh, India"


def load_vehicles():

    vehicles = []

    # -------------------------
    # AMBULANCES
    # -------------------------

    print("Loading ambulances...")

    try:
        hospitals = ox.features_from_place(
            CITY,
            {"amenity": "hospital"}
        )

        i = 0

        for _, row in hospitals.iterrows():

            if row.geometry.geom_type != "Point":
                continue

            vehicles.append({
                "id": f"AMB_{i}",
                "type": "ambulance",
                "lat": row.geometry.y,
                "lon": row.geometry.x,
                "status": "available",
                "incident_id": None
            })

            i += 1

    except Exception as e:
        print("Ambulance loading failed:", e)


    # -------------------------
    # FIRE TRUCKS
    # -------------------------

    print("Loading fire trucks...")

    fire_stations = [

        {"name": "Mhow Naka Fire Station", "lat": 22.7006, "lon": 75.8414},
        {"name": "Vijay Nagar Fire Station", "lat": 22.7536, "lon": 75.8937},
        {"name": "Rajwada Fire Station", "lat": 22.7177, "lon": 75.8554},
        {"name": "Aerodrome Road Fire Station", "lat": 22.7285, "lon": 75.8289}

    ]

    vehicles_per_station = 3

    for i, station in enumerate(fire_stations):

        for j in range(vehicles_per_station):

            vehicles.append({
                "id": f"FIRE_{i}_{j}",
                "type": "fire_truck",
                "lat": station["lat"],
                "lon": station["lon"],
                "status": "available",
                "incident_id": None
            })


    # -------------------------
    # POLICE VEHICLES
    # -------------------------

    print("Loading police vehicles...")

    try:

        police = ox.features_from_place(
            CITY,
            {"amenity": "police"}
        )

        i = 0

        for _, row in police.iterrows():

            if row.geometry.geom_type != "Point":
                continue

            vehicles.append({
                "id": f"POL_{i}",
                "type": "police",
                "lat": row.geometry.y,
                "lon": row.geometry.x,
                "status": "available",
                "incident_id": None
            })

            i += 1

    except Exception:
        print("Police station data not available.")

    print(f"Loaded {len(vehicles)} vehicles")

    return vehicles