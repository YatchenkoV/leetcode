from typing import Optional, Tuple
import pytest

ROMAN_TO_ARABIC = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
}


def roman_to_int_reversed(roman_string: str):
    res = 0
    previous: Optional[int] = None
    roman_array = [symbol for symbol in roman_string]
    roman_array.reverse()
    for elem in roman_array:
        current: int = ROMAN_TO_ARABIC[elem]

        if previous is not None and current < previous:
            res -= current
            previous = None
            continue

        previous = current
        res += current

    return res


def roman_to_int(roman_string: str):
    res = 0
    previous: Optional[int] = None
    for elem in roman_string:
        current: int = ROMAN_TO_ARABIC[elem]

        if previous is not None and current > previous:
            res += current - previous * 2
            previous = None
            continue

        previous = current
        res += current

    return res


@pytest.fixture(params=[
    ('IV', 4),
    ('XXXIV', 34),
    ('XVIII', 18),
    ('XXV', 25),
    ('XVI', 16),
    ('VIII', 8),
    ('XXII', 22),
    ('VII', 7),
    ('XXI', 21),
    ('CXCIII', 193),
    ('XC', 90),
    ('LVIII', 58),
    ('MCMXCIV', 1994)
])
def roman_str_fixture(request):
    return request.param


def test_roman_to_int(roman_str_fixture: Tuple[str, int]):
    roman_str, result = roman_str_fixture
    assert roman_to_int(roman_str) == result

def test_roman_to_int_reversed(roman_str_fixture: Tuple[str, int]):
    roman_str, result = roman_str_fixture
    assert roman_to_int_reversed(roman_str) == result
