const fs = require("node:fs");

const lines = fs.readFileSync("./b.input", "utf-8").split("\n");

// Parse data to sane format
const data = lines.map(line => {
    const s = line.split(': ')[1].split(' | ');
    const wining = s[0].split(' ').filter(c => c !== '').map(i => Number.parseInt(i, 10));
    const owned = s[1].split(' ').filter(c => c !== '').map(i => Number.parseInt(i, 10));
    return { wining, owned, copies: 1 };
});


const res = data.reduce((acc, {wining, owned, copies}, index) => {
    const won = wining.filter(w => owned.indexOf(w) > -1).length;

    for (let x = 0; x < won; x++) {
        data[index + 1 + x].copies += copies;
    }

     return acc + copies;
}, 0);


console.log(res);