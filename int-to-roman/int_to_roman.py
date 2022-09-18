import pytest

ROMAN_TO_INT = {
    "I": 1,
    "IV": 4,
    "V": 5,
    "IX": 9,
    "X": 10,
    "XL": 40,
    "L": 50,
    "XC": 90,
    "C": 100,
    "CD": 400,
    "D": 500,
    "CM": 900,
    "M": 1000
}

INT_TO_ROMAN = {v: k for k, v in ROMAN_TO_INT.items()}


def find_closest_int_by_roman_rules(num: int) -> int:
    if INT_TO_ROMAN.get(num): return num
    closest = 1
    delta_with_closest = float('infinity')
    for i in INT_TO_ROMAN.keys():
        delta = num - i

        if delta < 0 or delta >= delta_with_closest:
            # If delta is < 0, it means that current value (known roman-to-int accordance) is bigger than provided int.
            return closest

        if (delta_with_closest is None) or abs(delta) < abs(delta_with_closest):
            delta_with_closest = delta
            closest = i
            continue
    return closest


def part_to_roman(num: int) -> str:
    if simple_number := INT_TO_ROMAN.get(num): return simple_number

    res = ''
    remaining_int_part = num
    while remaining_int_part > 0:
        closest_int: int = find_closest_int_by_roman_rules(remaining_int_part)
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
    assert roman_str == int_to_roman_v1(number)
