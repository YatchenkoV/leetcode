import * as process from "process";
const ROMAN_TO_INT: Record<string, number> = {
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


function intToRoman(num: number): string {
    let res: string = '';
    let processedInt = num;
    for (const [romanString, value] of Object.entries(ROMAN_TO_INT).reverse()) {
        const countOccurrences = Math.trunc(processedInt/value); // Floor division (// in python)
        if (countOccurrences === 0) {
            continue;
        }
        res += romanString.repeat(countOccurrences);
        processedInt = processedInt % value;
        if (processedInt === 0) {
            return res;
        }
    }
    return res;
}

const args: number[] = process.argv[2] ? process.argv.splice(2, process.argv.length -1).map(Number) : [3, 4, 9, 12, 58, 1996]
for (const providedInt of args) {
    console.log('Int representation', providedInt);
    console.log('Roman representation', intToRoman(providedInt));
}


