const fs = require("node:fs");

const lines = fs.readFileSync("./b.input", "utf-8").split("\n");

let position = findStart(lines);
const path = [position];

do {
  position = findNextStep(position);
  if (position) path.push(position);
} while (position);

console.log(Math.floor(path.length / 2));

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

  return res.filter((n) => !path.some((p) => p.x === n.x && p.y === n.y))[0];
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
