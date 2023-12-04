const fs = require("node:fs");

const lines = fs.readFileSync("./a.input", "utf-8").split("\n");

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

const possible = lines.reduce((acc, line) => {
  const regex = /^(Game )(\d*)(: )(.*)/g;

  const match = regex.exec(line);
  const id = match[2];

  const gameInfo = match[4].split(";");

  console.log(line);
  let minR = 0;
  let minG = 0;
  let minB = 0;

  for (const info of gameInfo) {
    const redExp = /(\d*) red/g;
    const match = redExp.exec(info);

    if (match && Number.parseInt(match[1]) > minR) {
      minR = Number.parseInt(match[1]);
    }

    const redExp2 = /(\d*) green/g;
    const match2 = redExp2.exec(info);

    if (match2 && Number.parseInt(match2[1]) > minG) {
      minG = Number.parseInt(match2[1]);
    }

    const redExp3 = /(\d*) blue/g;
    const match3 = redExp3.exec(info);

    if (match3 && Number.parseInt(match3[1]) > minB) {
      minB = Number.parseInt(match3[1]);
    }
  }

  console.log("\n\n");

  return acc + minR * minG * minB;
}, 0);

console.log(possible);
