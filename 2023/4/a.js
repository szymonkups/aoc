const fs = require("node:fs");

const lines = fs.readFileSync("./a.input", "utf-8").split("\n");

// Parse data to sane format
const data = lines.map(line => {
    const s = line.split(': ')[1].split(' | ');
    const wining = s[0].split(' ').filter(c => c !== '').map(i => Number.parseInt(i, 10));
    const owned = s[1].split(' ').filter(c => c !== '').map(i => Number.parseInt(i, 10));
    return { wining, owned};
});

const res = data.reduce((acc, {wining, owned}) => {
    const won = wining.filter(w => owned.indexOf(w) > -1).length;

    if (won === 0) {
        return acc;
    }

    if (won === 1) {
        return acc + 1;
    }

    return acc + Math.pow(2, won-1);
}, 0);


console.log(res);