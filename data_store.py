from graph_loader import load_graph
from hospital_loader import load_hospitals
from vehicle_loader import load_vehicles
from signal_loader import load_signals

from scipy.spatial import KDTree

print("Loading road graph...")
G = load_graph()

print("Loading hospitals...")
HOSPITALS = load_hospitals()

print("Loading vehicles...")
VEHICLES = load_vehicles()

print("Loading traffic signals...")
SIGNALS = load_signals()

# build spatial index
signal_coords = [(s["lat"], s["lon"]) for s in SIGNALS]

if signal_coords:
    SIGNAL_TREE = KDTree(signal_coords)
else:
    SIGNAL_TREE = None

print("System data loaded successfully.")