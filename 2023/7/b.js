const fs = require("node:fs");

const cards = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
].reverse();
const hands = fs
  .readFileSync("./b.input", "utf-8")
  .split("\n")
  .map((i) => {
    const d = i.split(" ");

    return {
      hand: d[0],
      bid: Number.parseInt(d[1], 10),
      type: getHandType(d[0]),
    };
  })
  .sort((a, b) => {
    if (a.type === b.type) {
      return compareHands(a, b);
    }
    return a.type - b.type;
  });

console.log(
  hands.reduce((acc, item, index) => {
    return acc + item.bid * (index + 1);
  }, 0)
);

function compareHands(a, b) {
  for (let i = 0; i < a.hand.length; i++) {
    if (a.hand[i] !== b.hand[i]) {
      return getCardStrength(a.hand[i]) - getCardStrength(b.hand[i]);
    }
  }

  throw new Error("Comparsion hand error");
}

function getCardStrength(card) {
  return cards.indexOf(card);
}

function getHandType(hand) {
  const h = [...hand];
  let jokersCount = 0;
  h.sort();

  let prev = "";
  let count = 0;
  const groups = h.reduce((acc, item) => {
    if (prev === "") {
      prev = item;
      count = 1;
      return [];
    }

    if (prev === item) {
      count++;
      return acc;
    }

    if (prev === "J") {
      jokersCount = count;
    }
    acc.push(count);
    count = 1;
    prev = item;
    return acc;
  }, []);

  if (prev === "J") {
    jokersCount = count;
  }
  groups.push(count);
  groups.sort();

  // High card
  // 1,1,1,1,1
  if (groups.length === 5) {
    if (jokersCount === 1) {
      // One Pair
      return 2;
    }
    return 1;
  }

  // One pair
  // 1,1,1,2
  if (groups.length === 4) {
    if (jokersCount === 1 || jokersCount == 2) {
      // Tree of a kind
      return 4;
    }
    return 2;
  }

  if (groups.length === 3) {
    // Two pair
    if (JSON.stringify(groups) === "[1,2,2]") {
      if (jokersCount === 1) {
        // Full house
        return 5;
      }

      if (jokersCount === 2) {
        // FOur of a kind
        return 6;
      }

      return 3;
    }

    // Tree of a kind
    if (JSON.stringify(groups) === "[1,1,3]") {
      if (jokersCount === 1 || jokersCount === 3) {
        // Four of a kind
        return 6;
      }
      return 4;
    }

    throw new Error("length 3 not processed");
  }

  if (groups.length === 2) {
    // Full house
    if (JSON.stringify(groups) === "[2,3]") {
      if (jokersCount === 2 || jokersCount === 3) {
        // Five of a kind
        return 7;
      }

      return 5;
    }

    // Four of a kind
    if (JSON.stringify(groups) === "[1,4]") {
      if (jokersCount === 1 || jokersCount === 4) {
        // five of a kind
        return 7;
      }
      return 6;
    }

    throw new Error("length 2 not processed");
  }

  // Five of a kind
  if (groups.length === 1) {
    return 7;
  }

  throw new Error("not processed!");
  return groups;
}
