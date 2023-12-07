const fs = require("node:fs");

const lines = fs.readFileSync("./a.input", "utf-8").split("\n");
const times = lines[0]
  .split("Time:")[1]
  .trim()
  .split(" ")
  .filter((c) => c !== "")
  .map((n) => Number.parseInt(n));

const distances = lines[1]
  .split("Distance:")[1]
  .trim()
  .split(" ")
  .filter((c) => c !== "")
  .map((n) => Number.parseInt(n));

let res = 1;

times.forEach((time, index) => {
  const distace = distances[index];
  const wins = compute(time, distace);

  if (wins > 0) {
    res *= wins;
  }
});

console.log(res);

// (x^2-Tx+D=0)
function compute(time, distance) {
  // ax^2 - bx+ c = 0;
  // x^2 - time*x + distance = 0;

  const d = time * time - 4 * distance;

  if (d > 0) {
    const root1 = (-time + Math.sqrt(d)) / 2;
    const root2 = (-time - Math.sqrt(d)) / 2;

    let min;
    let max;
    let correction = 0;
    if (root1 > root2) {
      min = Math.ceil(root2);
      max = Math.floor(root1);

      if (min == root2) {
        correction += 1;
      }

      if (max == root1) {
        correction += 1;
      }
    } else {
      min = Math.ceil(root1);
      max = Math.floor(root2);

      if (min == root1) {
        correction += 1;
      }

      if (max == root2) {
        correction += 1;
      }
    }

    const res = Math.floor(max) - Math.ceil(min) + 1 - correction;

    return res;
  }

  return 0;
}
