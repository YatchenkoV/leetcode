import math

import pytest

ROMAN_TO_INT = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
}

PRIOR = {
    "M": "C",
    "D": "C",
    "C": "X",
    "L": "X",
    "X": "I",
    "V": "I",
}

INT_TO_ROMAN = {v: k for k, v in ROMAN_TO_INT.items()}


def find_closest_int_by_roman_rules(num: int) -> int:
    if INT_TO_ROMAN.get(num): return num
    closest = -1
    delta_with_closest = None
    for i in INT_TO_ROMAN.keys():
        delta = num - i
        if (delta_with_closest is None):
            delta_with_closest = delta
            closest = i
            continue

        if delta < 0:
            # If delta is < 0, it means that current value (known roman-to-int accordance) is bigger than provided int.

            if float(math.log10(abs(delta))).is_integer():
                # if number is 10,100,1000
                # Knowing that numbers before 10^n are represented differently (IX = 9)
                # Then if delta is < 0 and int to check is a 10^n number, then this is the closest one for roman representation
                return i
            return closest

        if abs(delta) < abs(delta_with_closest):
            delta_with_closest = delta
            closest = i
            continue

        if delta >= delta_with_closest: return closest

    return closest


def part_to_roman(num: int) -> str:
    if simple_number := INT_TO_ROMAN.get(num): return simple_number

    res = ''
    remaining_int_part = num
    while remaining_int_part > 0:
        closest_int: int = find_closest_int_by_roman_rules(remaining_int_part)
        if closest_int > remaining_int_part:
            symbol = INT_TO_ROMAN[closest_int]
            res += PRIOR[symbol] + symbol
        else:
            res += INT_TO_ROMAN[closest_int]

        remaining_int_part -= closest_int

    return res


def int_to_roman(num: int) -> str:
    res: str = ''
    divider: int = 10
    processed_int: int = num

    while processed_int != 0:
        part = processed_int % divider
        if part != 0:
            res = part_to_roman(part) + res
            processed_int -= part
        divider *= 10

    return res


@pytest.fixture(params=[
    (4, 'IV'),
    (34, 'XXXIV'),
    (18, 'XVIII'),
    (25, 'XXV'),
    (16, 'XVI'),
    (8, 'VIII'),
    (22, 'XXII'),
    (7, 'VII'),
    (21, 'XXI'),
    (193, 'CXCIII'),
    (90, 'XC'),
    (58, 'LVIII'),
    (1994, 'MCMXCIV')
])
def int_to_roman_fixture(request):
    return request.param


def test_int_to_roman(int_to_roman_fixture):
    number, roman_str = int_to_roman_fixture
    assert roman_str == int_to_roman(number)
