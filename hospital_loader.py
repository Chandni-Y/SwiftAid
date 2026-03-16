import osmnx as ox


def load_hospitals():

    print("Loading hospitals from OpenStreetMap...")

    place = "Indore, Madhya Pradesh, India"

    # Query only hospitals
    tags = {
        "amenity": "hospital"
    }

    gdf = ox.features_from_place(place, tags)

    hospitals = []

    for _, row in gdf.iterrows():

        try:

            # Some features have geometry instead of lat/lon
            lat = row.geometry.centroid.y
            lon = row.geometry.centroid.x

        except:
            continue

        name = row.get("name", "Unnamed Hospital")

        hospitals.append({
            "name": name,
            "lat": float(lat),
            "lon": float(lon)
        })

    print(f"Loaded {len(hospitals)} hospitals")

    return hospitals