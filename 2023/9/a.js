const fs = require("node:fs");

const lines = fs.readFileSync("./a.input", "utf-8").split("\n");

const report = lines.map((l) =>
  l
    .split(" ")
    .map((value) => ({
      value: Number.parseInt(value, 10),
      left: null,
      right: null,
    }))
    .map(connectNodes)
);

const res = report.reduce(
  (acc, sequence) => acc + calculateNextValue(sequence),
  0
);
console.log(res);

function calculateNextValue(sequence) {
  while (!allZeros(sequence)) {
    sequence = calculateDifferences(sequence);
  }

  let prevValue = 0;
  let currentNode = sequence[sequence.length - 1];

  while (currentNode.right !== null) {
    prevValue = currentNode.right.value + prevValue;
    currentNode = currentNode.right;
  }

  return prevValue;
}

function calculateDifferences(sequence) {
  const differences = [];

  for (let i = 0; i < sequence.length - 1; i++) {
    differences.push({
      value: sequence[i + 1].value - sequence[i].value,
      left: sequence[i],
      right: sequence[i + 1],
    });
  }

  return differences.map(connectNodes);
}

function connectNodes(node, index, sequence) {
  node.prev = index > 0 ? sequence[index - 1] : null;
  node.next = index < sequence.length - 1 ? sequence[index + 1] : null;

  return node;
}

function allZeros(sequence) {
  return !sequence.some((i) => i.value !== 0);
}
