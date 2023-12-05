const fs = require("node:fs");

const sections = fs.readFileSync("./a.input", "utf-8").split("\n\n");
const seeds = sections[0]
  .split("seeds: ")[1]
  .split(" ")
  .map((n) => Number.parseInt(n))
  .map((s, i, arr) => {
    if (i % 2) return null;

    return {
      start: s,
      end: s + arr[i + 1] - 1,
    };
  })
  .filter((n) => n !== null);
const seedToSoil = parseSection(sections[1], "seed-to-soil map:");
const soilToFertilizer = parseSection(sections[2], "soil-to-fertilizer map:");
const fertilizerToWater = parseSection(sections[3], "fertilizer-to-water map:");
const waterToLight = parseSection(sections[4], "water-to-light map:");
const lightToTemperature = parseSection(
  sections[5],
  "light-to-temperature map:"
);
const temperatureToHumidity = parseSection(
  sections[6],
  "temperature-to-humidity map:"
);

const humidtyToLocation = parseSection(
  sections[7],
  "humidity-to-location map:"
);

console.log(seeds);
console.log(seedToSoil);

function getDesinationRanges(src, section) {
  const sourceRage = src;
  const destinationRanges = [];
  for (let j = 0; j < section.length; j++) {
    if (sourceRage.start >= section.start && sourceRage.start <= section.end) {
      destinationRanges;
    }
  }
}

function parseSection(section, name) {
  return section
    .split(name)[1]
    .split("\n")
    .slice(1)
    .map((i) => i.split(" ").map((i) => Number.parseInt(i)))
    .map((e) => ({
      dst: { start: e[0], end: e[0] + e[2] - 1 },
      src: { start: e[1], end: e[1] + e[2] - 1 },
    }));
}

function findDestinatioInSection(section, toFind) {
  for (const element of section) {
    const { src, dst, len } = element;
    if (toFind >= src && toFind < src + len) {
      const index = toFind - src;

      return dst + index;
    }
  }

  return toFind;
}
