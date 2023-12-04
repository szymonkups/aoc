const fs = require('node:fs');

const input = fs.readFileSync('./b.txt', 'utf8').split('\n').filter(i => i.length > 0);
const validDigits = 'one two three four five six seven eight nine'.split(' ');

const answer = input.reduce((acc, line) => {

    const first =  {digit: '', index: Number.MAX_VALUE, toReplace: 0};
    const last =  {digit: '', index: -1, toReplace: 0};

    // Find first and last digit to replace.
    validDigits.forEach((digit, index) => {
        const position = line.indexOf(digit);

        if (position > -1 && position < first.index) {
            first.digit = digit;
            first.index = position;
            first.toReplace = (index + 1);
        }

        const position2 = line.lastIndexOf(digit);
        if (position2 > -1 && position2 > last.index) {
            last.digit = digit;
            last.index = position2;
            last.toReplace = (index + 1);
        }
    });


    // Parse the line into an array of numbers.
    const result = line.split('').map(i => Number.parseInt(i, 10));

    // Replace the NANs with the correct number.
    if (first.digit !== '') {
        result[first.index] = first.toReplace;
    }

    if (last.digit !== '') {
        result[last.index] = last.toReplace;
    }

    // Filter out NANs.
    const filtered = result.filter(i => !Number.isNaN(i));

    const concatenated = filtered[0].toString(10) + filtered[filtered.length - 1].toString(10);
    return acc + Number.parseInt(concatenated, 10);

}, 0)

console.log(`Answer B: ${answer}`);


