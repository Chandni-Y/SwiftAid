import time
import random
from data_store import SIGNALS

SIGNAL_STATE = {}

GREEN_TIME = 25
YELLOW_TIME = 5
RED_TIME = 30


def initialize_signals():

    for i, s in enumerate(SIGNALS):

        SIGNAL_STATE[i] = {
            "id": i,
            "lat": s["lat"],
            "lon": s["lon"],
            "state": random.choice(["red", "green", "yellow"]),
            "last_change": time.time(),
            "forced": False,
            "green_until": None
        }


def update_signal(sig):

    now = time.time()

    if sig["forced"]:
        if sig["green_until"] and now > sig["green_until"]:
            sig["forced"] = False
            sig["state"] = "yellow"
            sig["last_change"] = now
        return

    elapsed = now - sig["last_change"]

    if sig["state"] == "green" and elapsed > GREEN_TIME:
        sig["state"] = "yellow"
        sig["last_change"] = now

    elif sig["state"] == "yellow" and elapsed > YELLOW_TIME:
        sig["state"] = "red"
        sig["last_change"] = now

    elif sig["state"] == "red" and elapsed > RED_TIME:
        sig["state"] = "green"
        sig["last_change"] = now


def update_all_signals():

    for sig in SIGNAL_STATE.values():
        update_signal(sig)


def get_signal_states():

    update_all_signals()

    return list(SIGNAL_STATE.values())


def force_green(signal_id, duration=20):

    if signal_id not in SIGNAL_STATE:
        return False

    sig = SIGNAL_STATE[signal_id]

    sig["state"] = "green"
    sig["forced"] = True
    sig["green_until"] = time.time() + duration

    return True