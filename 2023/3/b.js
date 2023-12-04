const fs = require("node:fs");

const lines = fs.readFileSync("./b.input", "utf-8").split("\n");

const array = lines.map((line, y) => {
  return line.split("").map((c, x) => {
    const n = Number.parseInt(c);

    if (Number.isNaN(n)) {
      return c;
    }

    return n;
  });
});

for (let y = 0; y < array.length; y++) {
  const row = array[y];
  for (let x = 0; x < row.length; x++) {
    const c = row[x];
  }
}
console.log(array);

function convertToWholeNumber(x, row) {
  let i = x - 1;
  let n = "";
  while (i >= 0 && typeof row[i] === "number") {
    n = row[i].toString(10) + n;
    i--;
  }

  while (x < row.length && typeof row[x] === "number") {
    n = n + row[x].toString(10);
    x++;
  }

  return Number.parseInt(n, 10);
}

function hasAdjacentCharacter(x, y, array) {
  const adjacentIndexes = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ];

  for (const indexes of adjacentIndexes) {
    const [x, y] = indexes;

    if (x < 0 || y < 0) {
      continue;
    }

    if (y >= array.length) {
      continue;
    }

    if (x >= array[y].length) {
      continue;
    }

    const character = array[y][x];
    if (typeof character === "number" || character === ".") {
      continue;
    }

    if (typeof character.count === "number") {
      character.count++;
    }

    return [x, y];
  }

  return false;
}
