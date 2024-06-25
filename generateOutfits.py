import random
from itertools import product
import json

suits = [
    {"suitColor": "#343d63", "lapelColor": "#2a3152"},
    {"suitColor": "#32343d", "lapelColor": "#4c4e55"},
    {"suitColor": "#0c0c0c", "lapelColor": "#3c3c3c"},
    {"suitColor": "#4682b4", "lapelColor": "#b0c4de"},
    {"suitColor": "#68737c", "lapelColor": "#778899"},
    {"suitColor": "#292929", "lapelColor": "#000000"},
    {"suitColor": "#000000", "lapelColor": "#000000"},
    {"suitColor": "#121417", "lapelColor": "#4c4c4c"},
    {"suitColor": "#d2b48c", "lapelColor": "#c3b091"},
    {"suitColor": "#9e824e", "lapelColor": "#c0954a"},
    {"suitColor": "#dfa062", "lapelColor": "#da9959"},
    {"suitColor": "#dfa062", "lapelColor": "#fac490"}
]

shirts = [
    {"shirtColor": "#ffffff", "collarColor": "#ffffff"},
    {"shirtColor": "#6495ed", "collarColor": "#ffffff"},
    {"shirtColor": "#909096", "collarColor": "#ffffff"},
    {"shirtColor": "#d3d3d3", "collarColor": "#ffffff"}
]

tie_types = ["tie", "bowtie"]
pocket_square_types = ["type1", "type2", "emptypocket", "none"]

outfits = []
outfit_id = 200

for suit, shirt, tie in product(suits, shirts, tie_types):
    outfit = {
        "id": str(outfit_id),
        "suitColor": suit["suitColor"],
        "shirtColor": shirt["shirtColor"],
        "lapelColor": suit["lapelColor"],
        "collarColor": shirt["collarColor"]
    }

    pocket_square = random.choice(pocket_square_types)

    # Ensure at least one accessory is present
    while tie == "none" and (pocket_square == "none" or pocket_square == "emptypocket"):
        tie = random.choice(tie_types)
        pocket_square = random.choice(pocket_square_types)

    outfit["tieType"] = tie
    outfit["pocketSquareType"] = pocket_square

    outfits.append(outfit)

    outfit_id += 1

print(json.dumps(outfits, indent=2))
