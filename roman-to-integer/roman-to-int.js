const ROMAN_TO_INT = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
}

function romanToInt(romanStr) {
    let res = 0;
    let previous = null;
    for (const symbol of romanStr) {
        const current = ROMAN_TO_INT[symbol];
        if (previous && current > previous) {
            res += current - previous * 2;
            previous = null;
            continue;
        }

        previous = current;
        res += current;
    }
    return res;
}

console.log(romanToInt('CXCIII'), 193);
