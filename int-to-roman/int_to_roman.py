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


def int_to_roman(num: int) -> str:
    """
    Count floor division (//) from largest to smallest roman ints.
    It equals number of occurrences of roman_int in provided num.
    """
    res: str = ''
    processed_int: int = num
    for roman_str, value in reversed(ROMAN_TO_INT.items()):
        count_occurrences = processed_int // value
        if count_occurrences == 0:
            continue
        res += roman_str * count_occurrences
        processed_int %= value
        if processed_int == 0:
            return res

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
