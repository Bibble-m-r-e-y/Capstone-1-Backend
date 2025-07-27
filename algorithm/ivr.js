const testRankings = [
  ["F", "C", "A", "G"],
  ["B", "E"],
  ["G", "F", "C", "A", "D"],
  ["D"],
  ["A", "B", "E", "G"],
  ["C", "G", "F"],
  ["E", "A", "C", "D", "B", "F"],
  ["B"],
  ["F", "D", "C"],
  ["G", "E", "B", "A"],
  ["C", "F", "A", "G", "B", "D", "E"],
  ["A", "D"],
  ["E", "C", "B", "F", "G"],
  ["B", "D", "G", "C"],
  ["D", "A", "B"],
  ["G", "F"],
  ["F", "E", "A"],
  ["C", "A", "B", "G"],
  ["A"],
  ["E", "G", "D", "C", "B"],
  ["B", "F", "C"],
  ["D", "G", "A", "E", "C", "F", "B"],
  ["G", "B", "E", "F"],
  ["F"],
  ["C", "D", "E", "B"],
];
/*
{
  A: 3, --> B: 2, C: 4
  C: 3  --> B: 1, A: 5
}
*/
const outOfTheRunnning = [];

const findSmallestValue = (tally) => {
  const smallest = Math.min(...Object.values(tally));
  return smallest;
};

const chooseRandomOption = (arr) => {
  //picks  a random element in the array to delete
  const randomItem = arr[Math.floor((Math.random() * 100) % arr.length)];
  return randomItem;
};

const findLargestValue = (tally) => {
  const largest = Math.max(...Object.values(tally));
  return largest;
};

const reTally = (optionToRemove, count) => {
  for (let i = 0; i < testRankings.length; i++) {
    if (testRankings[i][0] === optionToRemove) {
      testRankings[i].shift();
      while (
        outOfTheRunnning.find(
          (optionOutOfTheRunning) =>
            testRankings[i][0] === optionOutOfTheRunning,
        )
      ) {
        testRankings[i].shift();
      }
      if (testRankings[i].length === 0) {
        testRankings.splice(i, 1);
      } else {
        if (!count[testRankings[i][0]]) {
          count[testRankings[i][0]] = 1;
        } else {
          count[testRankings[i][0]]++;
        }
      }
    }
  }
  console.log("Count after retally: ", count);
};

let maxTries = 0;

const Irv = (arrayOfRankings) => {
  const count = {}; //Initializes an empty object to count first-choice votes
  let total = arrayOfRankings.length; //Stores the total number of votes (rankings) for later use.

  // Creating the count of votes per option
  for (let i = 0; i < arrayOfRankings.length; i++) {
    //Start a loop to go through each voter’s ranking
    if (!count[arrayOfRankings[i][0]]) {
      //Check if this voter's first-choice candidate is not yet in the count
      count[arrayOfRankings[i][0]] = 1; //If it’s not in the object, add it with a count of 1.
    } else {
      count[arrayOfRankings[i][0]]++; //Otherwise, increase the vote count for that candidate
    }
  }
  console.log("Count at the beginning: ", count);
  //This will hold the highest number of first-place votes.
  let largest = findLargestValue(count);
  while (largest / arrayOfRankings.length <= 0.5 && maxTries < 10) {
    // keep looping if nobody got 51% of votes
    const x = Object.values(count).every((num) => num === largest); // every candidate has the same number of votes
    if (x) {
      //If it is a tie, move on to randomly eliminate one of the tied candidates.
      let y = chooseRandomOption(Object.keys(count)); //Picks one candidate at random from the list of candidates.

      delete count[y]; //Logs the name of the eliminated candidate, then removes them from the count object
      outOfTheRunnning.push(y);
      console.log("Option being removed is: ", y);
      reTally(y, count);
      // const ballotsToUpdate = testRankings.filter((ballot) => ballot[0] === y);
    } else {
      const smallest = findSmallestValue(count);
      const keysWithLeastVotes = Object.keys(count).filter(
        (key) => count[key] === smallest,
      );
      if (keysWithLeastVotes.length > 1) {
        const optionToRemove = chooseRandomOption(keysWithLeastVotes);
        delete count[optionToRemove];
        outOfTheRunnning.push(optionToRemove);
        console.log("Option being removed is: ", optionToRemove);
        reTally(optionToRemove, count);
      } else {
        delete count[keysWithLeastVotes[0]];
        outOfTheRunnning.push(keysWithLeastVotes[0]);
        console.log("Option being removed is: ", keysWithLeastVotes[0]);
        reTally(keysWithLeastVotes[0], count);
      }
    }
    largest = findLargestValue(count);
    console.log("Count after round end: ", count);
    maxTries++;
  }

  const winner = Object.keys(count).find((key) => count[key] === largest);
  return winner;
};

console.log("The winner is: ", Irv(testRankings));
