const fs = require("fs");

// Constants
const INPUT_FILE = "./input.txt";
const numberMapping = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};
const DELIMITERS = Object.freeze({
  EMPTY: "",
  SPACE: " ",
  NEW_LINE: "\n",
});

/**
 * @description Return the mapped value of a number (if available) or
 * return the input
 * @param {string} number
 * @returns {string}
 */
const addMappedValue = number => {
  const mappedNumber = numberMapping[number];
  return mappedNumber ? mappedNumber : number;
};

/**
 * @description Filters the list by obtaining valid digits
 * and returns a two digit string
 * @param {string} inputLine
 * @returns {string}
 */
const getCalibratedValue = inputLine => {
  const filteredNumbers = inputLine.split(DELIMITERS.EMPTY).filter(Number);
  return filteredNumbers.length === 0
    ? 0
    : +(filteredNumbers[0] + filteredNumbers[filteredNumbers.length - 1]);
};

/**
 * @description Iterates through the input string and
 * filters the valid digits (both word and numerical)
 * Returns a two digit string after filtering the inputs
 * @param {string} inputLine
 * @returns {string}
 */
const getActualCalibratedValue = inputLine => {
  let i = 0;
  let numbers = Object.keys(numberMapping).concat(Object.values(numberMapping));
  let filteredNumbers = [];
  while (i < inputLine.length) {
    let string = DELIMITERS.EMPTY;
    let found = false;
    let j = i;
    while (j < inputLine.length) {
      string += inputLine[j];
      if (numbers.includes(string)) {
        filteredNumbers.push(addMappedValue(string));
        found = true;
        break;
      }
      j++;
    }
    if (found && i !== j) {
      i = j;
    } else {
      i++;
    }
  }
  return filteredNumbers.length === 0
    ? 0
    : Number(filteredNumbers[0] + filteredNumbers[filteredNumbers.length - 1]);
};

fs.readFile(INPUT_FILE, "utf-8", (err, data) => {
  if (err) {
    return;
  }
  const inputLines = data.split(DELIMITERS.NEW_LINE);
  let sumOfValues = 0;
  let sumOfActualValues = 0;
  inputLines.forEach(inputLine => {
    sumOfValues += getCalibratedValue(inputLine);
    sumOfActualValues += getActualCalibratedValue(inputLine);
  });
  console.log(sumOfValues, sumOfActualValues);
});
