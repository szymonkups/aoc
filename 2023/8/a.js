const fs = require("node:fs");

const lines = fs.readFileSync("./a.input", "utf-8").split("\n");

const instructions = lines[0].split("");

const nodes = lines.splice(2).reduce((acc, item) => {
  const regex = /^([A-Z]*) = \(([A-Z]*), ([A-Z]*)\)/g;
  const res = regex.exec(item);

  acc[res[1]] = {
    L: res[2],
    R: res[3],
  };

  return acc;
}, {});

let currentNode = "AAA";
let jumps = 0;
let instructionIndex = 0;
while (currentNode !== "ZZZ") {
  const instruction = instructions[instructionIndex];
  instructionIndex++;

  if (instructionIndex === instructions.length) {
    instructionIndex = 0;
  }

  currentNode = nodes[currentNode][instruction];

  jumps++;
}

console.log(jumps);
