const fs = require("node:fs");

const lines = fs.readFileSync("./b.input", "utf-8").split("\n");

const instructions = lines[0].split("");
let currentNodes = [];

const nodes = lines.splice(2).reduce((acc, item) => {
  const regex = /^([A-Za-z0-9]*) = \(([A-Za-z0-9]*), ([A-Za-z0-9]*)\)/g;
  const res = regex.exec(item);

  if (res[1][2] === "A") {
    currentNodes.push(res[1]);
  }

  acc[res[1]] = {
    L: res[2],
    R: res[3],
  };

  return acc;
}, {});

const jumps = [];
for (const currentNode of currentNodes) {
  jumps.push(calculateJumps(currentNode));
}

console.log(leastCommonMultiple(...jumps));

// credits to https://www.30secondsofcode.org/js/s/lcm/
function leastCommonMultiple(...arr) {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
}

function calculateJumps(currentNode) {
  let jumps = 0;
  let instructionIndex = 0;
  do {
    const instruction = instructions[instructionIndex];
    instructionIndex++;

    if (instructionIndex === instructions.length) {
      instructionIndex = 0;
    }

    currentNode = nodes[currentNode][instruction];

    jumps++;
  } while (currentNode[2] !== "Z");

  return jumps;
}
