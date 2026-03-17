from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from dispatch import emergency_dispatch
from routing import get_route
from hospital_selector import find_nearest_hospital
from vehicle_selector import find_nearest_vehicle
from data_store import SIGNALS, VEHICLES
from routing import reroute
from incident_manager import get_incidents
from incident_manager import complete_incident
from vehicle_manager import release_vehicle
from signal_controller import initialize_signals, get_signal_states
from incident_manager import INCIDENTS


app = FastAPI()
initialize_signals()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"status": "Green Corridor Backend Running"}


@app.get("/route")
def route(start_lat: float, start_lon: float, end_lat: float, end_lon: float):
    return get_route(start_lat, start_lon, end_lat, end_lon)


@app.get("/signal-plan")
def signal_plan(start_lat: float, start_lon: float, end_lat: float, end_lon: float):

    routes = get_route(start_lat, start_lon, end_lat, end_lon)

    if not routes:
        return {"signals": []}

    primary = routes[0]

    return {
        "signals": primary["signals"]
    }


@app.get("/nearest-hospital")
def nearest_hospital(lat: float, lon: float):
    return find_nearest_hospital(lat, lon)


@app.get("/nearest-vehicle")
def nearest_vehicle(lat: float, lon: float, type: str = "ambulance"):
    return find_nearest_vehicle(lat, lon, type)


@app.get("/emergency-dispatch")
def dispatch(lat: float, lon: float, type: str = "medical"):
    return emergency_dispatch(lat, lon, type)


@app.get("/signals")
def get_signals():
    return SIGNALS


@app.get("/reroute")
def reroute_vehicle(current_lat: float, current_lon: float, dest_lat: float, dest_lon: float):

    route = reroute(current_lat, current_lon, dest_lat, dest_lon)

    return {
        "route": route
    }


# INCIDENT APIs

@app.get("/incidents")
def incidents():
    return get_incidents()


@app.get("/complete-incident")
def complete_incident_endpoint(incident_id: str, vehicle_id: str):

    complete_incident(incident_id)

    release_vehicle(vehicle_id)

    return {
        "status": "incident completed"
    }


# VEHICLE APIs

@app.get("/vehicles")
def get_vehicles():
    return VEHICLES


@app.get("/vehicles/active")
def active_vehicles():
    return [v for v in VEHICLES if v["status"] == "busy"]


@app.get("/vehicles/available")
def available_vehicles():
    return [v for v in VEHICLES if v["status"] == "available"]

@app.get("/signal-status")
def signal_status():
    return get_signal_states()

@app.get("/incident-arrived")
def incident_arrived(incident_id: str):

    for inc in INCIDENTS:
        if inc["id"] == incident_id:
            inc["status"] = "arrived"
            return {"status": "updated"}

    return {"error": "incident not found"}