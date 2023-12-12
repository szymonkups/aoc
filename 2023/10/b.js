const fs = require("node:fs");

const lines = fs.readFileSync("./b.input", "utf-8").split("\n");

const start = findStart(lines);
let position = start;
const path = [position];

do {
  position = findNextStep(position);
  if (position) path.push(position);
} while (position);

let inside = 0;

lines.forEach((line, y) => {
  line.split("").forEach((char, x) => {
    inside += isInside({ x, y }) ? 1 : 0;
  });
});

console.log(inside);

function isInside({ x, y }) {
  if (isOnPath({ x, y })) {
    return false;
  }

  const startOnLeft = start.x < x;

  let cuts = 0;
  let prev = "";

  if (startOnLeft) {
    for (let i = x + 1; i < lines[y].length; i++) {
      if (!isOnPath({ x: i, y })) {
        prev = "";
        continue;
      }

      const curr = lines[y][i];

      if (curr === "-") {
        continue;
      }

      if (["|", "J", "7", "F", "L"].includes(curr)) {
        const sameDir =
          (prev === "F" && curr === "J") || (prev === "L" && curr === "7");

        if (!sameDir) {
          cuts++;
        }
      }

      prev = curr;
    }
  } else {
    for (let i = x - 1; i >= 0; i--) {
      if (!isOnPath({ x: i, y })) {
        prev = "";
        continue;
      }

      const curr = lines[y][i];

      if (curr === "-") {
        continue;
      }

      if (["|", "J", "7", "F", "L"].includes(curr)) {
        const sameDir =
          (curr === "F" && prev === "J") || (curr === "L" && prev === "7");

        if (!sameDir) {
          cuts++;
        }
      }

      prev = curr;
    }
  }

  // if (cuts % 2 !== 0) {
  //   console.log(x, y, cuts);
  // }
  return cuts % 2 !== 0;
}

function findNextStep({ x, y }) {
  const res = [];
  const current = lines[y][x];

  if (lines[y - 1] && ["|", "L", "J", "S"].includes(current)) {
    const above = lines[y - 1][x];
    if (above && ["|", "7", "F", "S"].includes(above)) {
      res.push({ x, y: y - 1 });
    }
  }

  if (lines[y]) {
    if (["-", "J", "7", "S"].includes(current)) {
      const left = lines[y][x - 1];
      if (left && ["-", "L", "F", "S"].includes(left)) {
        res.push({
          x: x - 1,
          y,
        });
      }
    }

    if (["-", "F", "L", "S"].includes(current)) {
      const right = lines[y][x + 1];
      if (right && ["-", "7", "J", "S"].includes(right)) {
        res.push({
          x: x + 1,
          y,
        });
      }
    }
  }

  if (lines[y + 1] && ["|", "F", "7", "S"].includes(current)) {
    const below = lines[y + 1][x];
    if (below && ["J", "|", "L", "S"].includes(below)) {
      res.push({
        x,
        y: y + 1,
      });
    }
  }

  return res.filter((n) => !isOnPath(n))[0];
}

function isOnPath({ x, y }) {
  return path.some((p) => p.x === x && p.y === y);
}

function findStart(lines) {
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "S") {
        return { x, y };
      }
    }
  }
}
