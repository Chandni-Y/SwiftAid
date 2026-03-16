import random

def get_congestion_factor(road_type):

    # base traffic based on road type
    if road_type in ["motorway", "trunk"]:
        base = 1.1
    elif road_type in ["primary"]:
        base = 1.3
    elif road_type in ["secondary"]:
        base = 1.5
    else:
        base = 1.8

    # random variation
    noise = random.uniform(0.9, 1.2)

    return base * noise