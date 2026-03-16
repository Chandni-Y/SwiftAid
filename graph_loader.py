import osmnx as ox
import os

GRAPH_FILE = "indore_graph.graphml"

def load_graph():

    if os.path.exists(GRAPH_FILE):

        print("Loading graph from file...")
        G = ox.load_graphml(GRAPH_FILE)

    else:

        print("Downloading graph from OpenStreetMap...")

        G = ox.graph_from_place(
            "Indore, Madhya Pradesh, India",
            network_type="drive"
        )

        ox.save_graphml(G, GRAPH_FILE)

    return G