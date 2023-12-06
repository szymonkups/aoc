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

const soils = findDestinations(seeds, seedToSoil);
const fertilizers = findDestinations(soils, soilToFertilizer);
const waters = findDestinations(fertilizers, fertilizerToWater);
const lights = findDestinations(waters, waterToLight);
const tempures = findDestinations(lights, lightToTemperature);
const humidity = findDestinations(tempures, temperatureToHumidity);
const locations = findDestinations(humidity, humidtyToLocation);

console.log(locations.sort((a, b) => a.start - b.start));
function findDestinations(sources, sections) {
  const destiantions = [];
  sources.forEach((source) => {
    destiantions.push(...findDestination(source, sections));
  });

  return destiantions;
}

function findDestination(input, sections) {
  let srcs = [input];
  const destinations = [];

  for (let section of sections) {
    const newSrcs = [];
    for (let src of srcs) {
      const { intersection, difference } = getSectionsIntersection(
        src,
        section.src
      );

      if (intersection !== null) {
        const startOffset = intersection.start - section.src.start;
        const length = intersection.end - intersection.start;
        destinations.push({
          start: section.dst.start + startOffset,
          end: section.dst.start + startOffset + length,
        });
      }

      newSrcs.push(...difference);
    }

    srcs = [...newSrcs];
  }

  // Not mapped
  destinations.push(...srcs);

  return destinations;
}

function getSectionsIntersection(sectionA, sectionB) {
  const difference = [];
  let intersection = null;

  // A outside of B
  if (sectionA.end < sectionB.start || sectionA.start > sectionB.end) {
    difference.push(sectionA);
  }

  // A entirely contained in B
  if (sectionA.start >= sectionB.start && sectionA.end <= sectionB.end) {
    intersection = sectionA;
  }

  // End of A contained in B
  if (
    sectionA.start < sectionB.start &&
    sectionA.end >= sectionB.start &&
    sectionA.end <= sectionB.end
  ) {
    intersection = { start: sectionB.start, end: sectionA.end };
    difference.push({ start: sectionA.start, end: sectionB.start - 1 });
  }

  // Begining of A contained in B
  if (
    sectionA.start >= sectionB.start &&
    sectionA.start <= sectionB.end &&
    sectionA.end > sectionB.end
  ) {
    intersection = { start: sectionA.start, end: sectionB.end };
    difference.push({ start: sectionB.end + 1, end: sectionA.end });
  }

  // B full in A
  if (sectionA.start < sectionB.start && sectionA.end > sectionB.end) {
    intersection = { ...sectionB };
    difference.push({ start: sectionA.start, end: sectionB.start - 1 });
    difference.push({ start: sectionB.end + 1, end: sectionA.end });
  }

  return {
    intersection,
    difference,
  };
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
