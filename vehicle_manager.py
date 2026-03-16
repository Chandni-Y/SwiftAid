from data_store import VEHICLES


def release_vehicle(vehicle_id):

    for v in VEHICLES:

        if v["id"] == vehicle_id:

            v["status"] = "available"
            v["incident_id"] = None

            return