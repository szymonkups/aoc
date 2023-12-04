const fs = require("node:fs");

const lines = fs.readFileSync("./b.input", "utf-8").split("\n");


const array = lines.map((line) => {
  return line.split('').map((c) => {

    const n = Number.parseInt(c);

    if (Number.isNaN(n)) {
      if (c === '*') {
        return [];
      }

      if (c === '.') {
        return null;
      }

      return { other: true };
    }

    return n;
  });
});

console.log(array);


const newArray = [];
for (let y = 0; y < array.length; y++) {
  const row = array[y];
  newArray[y] = [];
  for (let x = 0; x < row.length; x++) {
    const c = row[x];
    if (typeof c === 'number') {
      newArray[y][x] = convertToWholeNumber(x, y, row);
    } else {
      newArray[y][x] = c;
    }
  }
}

let res = 0;
for (let y = 0; y < newArray.length; y++) {
  const row = newArray[y];
  for (let x = 0; x < row.length; x++) {
    const c = row[x];

    if (Array.isArray(c)) {
      const found = findAdjacentNumbers(x, y, newArray);
      row[x].push(...found);
      const indexes = [];
      row[x] = row[x].filter(el => {
        if (indexes.indexOf(el.startIndex) > -1) {
          return false;
        }

        indexes.push(el.startIndex);
        return true;
      });

      if (row[x].length === 2) {
        res += row[x][0].n * row[x][1].n;
      }
    }

   
  }
}

console.log(res);

function convertToWholeNumber(x, y, row) {
  let i = x - 1;
  let n = "";
  while (i >= 0 && typeof row[i] === "number") {
    n = row[i].toString(10) + n;
    i--;
  }

  const startIndex = i + 1;

  while (x < row.length && typeof row[x] === "number") {
    n = n + row[x].toString(10);
    x++;
  }

  return { n: Number.parseInt(n, 10),  startIndex: `${startIndex}:${y}`};
}

function findAdjacentNumbers(x, y, array) {
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

  const found = [];
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

    const c = array[y][x];

    if (c && c.other) {
      return [];
    }

    if (c && c.n) {
      found.push(c);
    }
  }

  return found;
}
