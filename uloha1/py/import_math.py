import math

def is_on_wall(point, edge_length):
    x, y, z = point
    return (
        (x == 0 or x == edge_length) and 20 <= y <= edge_length - 20 and 20 <= z <= edge_length - 20
        or (y == 0 or y == edge_length) and 20 <= x <= edge_length - 20 and 20 <= z <= edge_length - 20
        or (z == 0 or z == edge_length) and 20 <= y <= edge_length - 20 and 20 <= x <= edge_length - 20
    )

def minimum(lst, get_index=False):
    min_val = min(lst)
    min_index = lst.index(min_val) if get_index else 0
    return min_index if get_index else min_val

def main():
    while True:
        edge_length_str = input("Zadejte rozmer mistnosti:\n")

        try:
            edge_length = float(edge_length_str)
        except ValueError:
            print("Nespravny vstup.")
            continue

        if edge_length <= 0:
            print("Nespravny vstup.")
        else:
            break

    points = []

    for i in range(2):
        while True:
            print(f"Bod #{i + 1}:")
            coordinates_str = input()
        
            try:
                coordinates = list(map(float, coordinates_str.split()))
            except ValueError:
                print("Nespravny vstup.")
                continue

            if len(coordinates) != 3 or not is_on_wall(coordinates, edge_length):
                print("Nespravny vstup.")
            else:
                break

        points.append(coordinates)

    is_opposite = any(
        (points[0][i] == 0 and points[1][i] == edge_length) or (points[0][i] == edge_length and points[1][i] == 0)
        for i in range(3)
    )

    if is_opposite:
        wall_index = next(i for i in range(3) if points[0][i] == edge_length or points[0][i] == 0)

        lengths = [
            [edge_length - points[0][1] + edge_length + edge_length - points[1][1],  # up
             edge_length - points[0][2] + edge_length + edge_length - points[1][2],  # left
             points[0][1] + edge_length + points[1][1],  # down
             points[0][2] + edge_length + points[1][2]],  # right
            [abs(points[0][2] - points[1][2]), abs(points[0][1] - points[1][1]),
             abs(points[0][2] - points[1][2]), abs(points[0][1] - points[1][1])]
        ]

        circuit_lengths = [lengths[0][j] + lengths[1][j] for j in range(4)]
        hypotenuses = [math.sqrt(lengths[0][j] ** 2 + lengths[1][j] ** 2) for j in range(4)]


        pipe_length = lengths[0][minimum(circuit_lengths, True)] + lengths[1][minimum(circuit_lengths, True)]
        hose_length = hypotenuses[minimum(hypotenuses, True)]

    else:
        if points[0][0] != 0 and points[0][0] != edge_length and points[1][0] != 0 and points[1][0] != edge_length:
            hose_length = math.sqrt(
                (points[1][0] - points[0][0]) ** 2 + (abs(points[1][1] - points[0][1]) + abs(points[1][2] - points[0][2])) ** 2
            )

        elif points[1][1] != 0 and points[1][1] != edge_length and points[0][1] != 0 and points[0][1] != edge_length:
            hose_length = math.sqrt(
                (points[1][1] - points[0][1]) ** 2 + (abs(points[1][0] - points[0][0]) + abs(points[1][2] - points[0][2])) ** 2
            )

        elif points[1][2] != 0 and points[1][2] != edge_length and points[0][2] != 0 and points[0][2] != edge_length:
            hose_length = math.sqrt(
                (points[1][2] - points[0][2]) ** 2 + (abs(points[1][0] - points[0][0]) + abs(points[1][1] - points[0][1])) ** 2
            )

        pipe_length = abs(points[0][0] - points[1][0]) + abs(points[0][1] - points[1][1]) + abs(points[0][2] - points[1][2])

    print(f"Delka potrubi: {pipe_length}\nDelka hadice: {hose_length}")

if __name__ == "__main__":
    main()
