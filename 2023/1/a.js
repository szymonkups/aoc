const fs = require('node:fs');

const input = fs.readFileSync('./a.txt', 'utf8').split('\n').filter(i => i.length > 0);

const answer = input.reduce((acc, line) => {
    const result = line.split('').map(i => Number.parseInt(i, 10)).filter(i => !Number.isNaN(i));

    const concatenated = result[0].toString(10) + result[result.length - 1].toString(10);

    return acc + Number.parseInt(concatenated, 10);
}, 0)

console.log(`Answer B: ${answer}`);


