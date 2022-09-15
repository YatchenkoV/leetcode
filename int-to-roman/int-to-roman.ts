import * as process from "process";

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

const PRIOR: Record<string, string> = {
    "M": "C",
    "D": "C",
    "C": "X",
    "L": "X",
    "X": "I",
    "V": "I",
}

const INT_TO_ROMAN: Record<number, string> = swapKeysAndValues(ROMAN_TO_INT);

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
            // If delta is < 0, it means that current value (known roman-to-int accordance) is bigger than provided int.

            if (Number.isInteger(Math.log10(Math.abs(delta)))) {
                // if number is 10,100,1000
                // Knowing that numbers before 10^n are represented differently (IX = 9)
                // Then if delta is < 0 and int to check is a 10^n number, then this is the closest one for roman representation
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
    while (remainingIntPart > 0) {
        let closestInt = findClosestIntByRomanRules(remainingIntPart);
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
    let res: string = '';
    let divider: number = 10;
    let processedNumber: number = num;
    while (processedNumber) {
        const part = processedNumber % divider;
        if (part !== 0) {
            res = partToRoman(part) + res;
            processedNumber -= part
        }
        divider *= 10;
    }

    return res
}
intToRoman(9)

const args: number[] = process.argv[2] ? process.argv.splice(2, process.argv.length -1).map(Number) : [3, 4, 58, 1996]
for (const providedInt of args) {
    console.log('Int representation', providedInt);
    console.log('Roman representation', intToRoman(providedInt));
}


