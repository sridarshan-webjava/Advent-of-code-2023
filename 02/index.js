const fs = require("fs");

// Constants
const INPUT_FILE = "./input.txt";
const RED = "red";
const BLUE = "blue";
const GREEN = "green";
const DELIMITERS = Object.freeze({
  COMMA: ",",
  SEMI_COLON: ";",
  SPACE: " ",
  NEW_LINE: "\n",
});

/**
 * @description Computes the result for a game round and determines if the
 * round can be considered valid and also evaluates the power set of the cubes
 * required for making the invalid round a valid one
 * @param {string[]} outcomes
 * @returns {[boolean, number]}
 */
const gameResult = outcomes => {
  let maxRed = 0;
  let maxGreen = 0;
  let maxBlue = 0;
  let isValid = true;
  for (let i = 0; i < outcomes.length; i++) {
    const cubes = outcomes[i].trimStart().trimEnd().split(DELIMITERS.COMMA);
    for (let j = 0; j < cubes.length; j++) {
      const [cubeCount, colour] = cubes[j]
        .trimStart()
        .trimEnd()
        .split(DELIMITERS.SPACE);
      const countValue = +cubeCount;
      if (colour.includes(RED) && countValue > maxRed) {
        maxRed = countValue;
      } else if (colour.includes(BLUE) && countValue > maxBlue) {
        maxBlue = countValue;
      } else if (colour.includes(GREEN) && countValue > maxGreen) {
        maxGreen = countValue;
      }
    }
    if (maxRed > 12 || maxBlue > 14 || maxGreen > 13) {
      isValid = false;
    }
  }
  const powerSet = maxRed * maxBlue * maxGreen;
  return [isValid, powerSet];
};

fs.readFile(INPUT_FILE, "utf-8", (err, data) => {
  if (err) {
    return;
  }
  const inputLines = data.split(DELIMITERS.NEW_LINE);
  let sumOfGameIds = 0;
  let powerSetValue = 0;
  // Iterate through each inputLine/Game outcomes and compute
  // sum of game Ids and sum of powerset of cubes
  inputLines.forEach(inputLine => {
    const [game, gameOutcomes] = inputLine.split(DELIMITERS.COMMA);
    const result = gameResult(
      gameOutcomes.trimStart().trimEnd().split(DELIMITERS.SEMI_COLON)
    );
    if (result[0]) {
      const gameId = game.split(" ")[1];
      sumOfGameIds += +gameId;
    }
    powerSetValue += result[1];
  });
  console.log(sumOfGameIds, powerSetValue);
});
