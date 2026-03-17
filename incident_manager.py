import time

INCIDENTS = {}

def create_incident(lat, lon, type, vehicle, hospital=None):

    incident_id = f"INC_{len(INCIDENTS)+1}"

    INCIDENTS[incident_id] = {
        "id": incident_id,
        "type": type,
        "lat": lat,
        "lon": lon,
        "vehicle_id": vehicle["id"],
        "vehicle_type": vehicle["type"],
        "hospital": hospital,
        "status": "active",
        "stage": "dispatched",
        "created_time": time.time(),
        "completed_time": None
    }

    return INCIDENTS[incident_id]


def update_stage(incident_id, stage):

    if incident_id in INCIDENTS:
        INCIDENTS[incident_id]["stage"] = stage


def complete_incident(incident_id):

    if incident_id in INCIDENTS:
        INCIDENTS[incident_id]["status"] = "completed"
        INCIDENTS[incident_id]["stage"] = "completed"
        INCIDENTS[incident_id]["completed_time"] = time.time()
    return INCIDENTS[incident_id]

    return None


def get_incidents():
    return list(INCIDENTS.values())