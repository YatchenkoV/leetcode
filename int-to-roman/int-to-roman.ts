const swapKeysAndValues = (obj: Record<string, number>): Record<number, string> => Object.entries(obj).reduce((ret, [key, value]) => Object.assign(ret, {[value]: key}), {});
const ROMAN_TO_INT: Record<string, number> = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
}

const FULL_PARTS = [1, 10, 100, 1000]

const PRIOR: Record<string, string> = {
    "M": "C",
    "D": "C",
    "C": "X",
    "L": "X",
    "X": "I",
    "V": "I",
}

const INT_TO_ROMAN: Record<number, string> = swapKeysAndValues(ROMAN_TO_INT);

const romanSymbolToInt = (romanSymbol: string): number => {
    return ROMAN_TO_INT[romanSymbol]
}
const stringToArray = (s: string): string[] => s.split('')
const reverseString = (s: string): string => stringToArray(s).reverse().join('')

function findClosestIntByRomanRules(int: number): number {
    if (INT_TO_ROMAN.hasOwnProperty(int)) return int;
    let closest = -1;
    let delta_with_closest = null;
    for (let i of Object.keys(INT_TO_ROMAN)) {
        let delta = int - Number(i);
        if (!delta_with_closest) {
            delta_with_closest = delta;
            closest = Number(i);
            continue;
        }
        if (delta < 0) {
            // case of 1, 10, 100, 1000
            if (Number.isInteger(Math.log10(Math.abs(delta)))) {
                return Number(i);
            }
            return closest;
        }
        if (Math.abs(delta) < Math.abs(delta_with_closest)) {
            closest = Number(i);
            delta_with_closest = delta;
            continue;
        }
        if (delta >= delta_with_closest) {
            return closest;
        }
    }
    return closest;
}

function partToRoman(num: number): string {
    if (INT_TO_ROMAN.hasOwnProperty(num)) return INT_TO_ROMAN[num];
    let res = '';
    let remainingIntPart = num
    while (remainingIntPart) {
        let closestInt = findClosestIntByRomanRules(num);
        if (closestInt > remainingIntPart) {
            const symbol: string = INT_TO_ROMAN[closestInt]
            res += PRIOR[symbol] + symbol
        } else {
            res += INT_TO_ROMAN[closestInt];
        }
        remainingIntPart = remainingIntPart - closestInt;
    }
    return res;
}

function intToRoman(num: number): string {
    let res = '';
    let divider = 10;
    while (true) {
        const part = Math.trunc(num / divider);
        if (part === 0) {
            res = partToRoman(num);
            break;
        }

        res = partToRoman(part) + res;
        divider *= 10;
    }

    return res
}

console.log(intToRoman(Number(process.argv[3]) || 1));


