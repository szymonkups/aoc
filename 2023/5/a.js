const fs = require("node:fs");

const sections = fs.readFileSync("./a.input", "utf-8").split("\n\n");
const seeds = sections[0]
  .split("seeds: ")[1]
  .split(" ")
  .map((n) => Number.parseInt(n));
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

const locations = seeds.map((seed) => {
  const soil = findDestinatioInSection(seedToSoil, seed);
  const fertilizer = findDestinatioInSection(soilToFertilizer, soil);
  const water = findDestinatioInSection(fertilizerToWater, fertilizer);
  const light = findDestinatioInSection(waterToLight, water);
  const temperature = findDestinatioInSection(lightToTemperature, light);
  const humidity = findDestinatioInSection(temperatureToHumidity, temperature);
  const location = findDestinatioInSection(humidtyToLocation, humidity);

  return location;
});

console.log(Math.min(...locations));

function parseSection(section, name) {
  return section
    .split(name)[1]
    .split("\n")
    .slice(1)
    .map((i) => i.split(" ").map((i) => Number.parseInt(i)))
    .map((e) => ({
      dst: e[0],
      src: e[1],
      len: e[2],
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
