const ROMAN_TO_INT = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
}

const romanSymbolToInt = (romanSymbol) => {
    return ROMAN_TO_INT[romanSymbol]
}
const stringToArray = (s) => s.split('')
const reverseString = (s) => stringToArray(s).reverse().join('')

function romanToIntReducer(romanStr) {
    return stringToArray(romanStr).map(romanSymbolToInt).reduce((accumulator, currentValue, index, array) => {
        const previous = array[index - 1];

        if (previous && currentValue > previous) {
            return accumulator + currentValue - previous * 2
        }
        return accumulator + currentValue
    }, 0)
}

function romanToIntOneLiner(romanStr) {
    return stringToArray(romanStr).map(romanSymbolToInt).reduce((accumulator, currentValue, index, array) => array[index - 1] && currentValue > array[index - 1] ? accumulator + currentValue - array[index - 1] * 2 : accumulator + currentValue, 0)
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

function romanToIntReversed(romanStr) {
    let res = 0;
    let previous = null;
    for (const symbol of reverseString(romanStr)) {
        const current = ROMAN_TO_INT[symbol];
        if (previous && current < previous) {
            res -= current
            previous = null;
            continue;
        }

        previous = current;
        res += current;
    }
    return res;
}


console.log(romanToInt('CXCIII'), 193);
console.log(romanToIntOneLiner('CXCIII'), 193);
console.log(romanToIntReducer('CXCIII'), 193);
console.log(romanToIntReversed('CXCIII'), 193);
