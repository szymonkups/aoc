const fs = require('node:fs');

const file =  fs.readFileSync('./input.txt', 'utf-8');

let max = [];
let current = 0;
file.split(/\r?\n/).forEach((line) => {
    if (line === '') {
        max.push(current);
        current = 0;
        return;
    }
    const cal = Number.parseInt(line, 10);
    current += cal;
});

max = max.sort((a, b) => b - a);
console.log(max[0] + max[1] + max[2]);
