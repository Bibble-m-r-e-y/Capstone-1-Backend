const testRankings = [
  ["A", "B", "C"],
  ["A", "C", "B"],
  ["C", "B", "A"],
  ["C", "B", "C"],
  ["C", "A", "C"],
  ["B", "A", "C"],
];
const A = [1, 3, 4, 5];

const theSmallest = (small) => {
  const smallest = Math.min(...small);
  console.log(smallest);
  return smallest;
};

const randomDelete = (arr) => {
  //picks  a random element in the array to delete
  let x = arr[Math.floor((Math.random() * 100) % arr.length)];
  return x;
};

const findBiggest = (tally) => {
  let largest = 0;
  for (let key in tally) {
    console.log(tally[key]);
    if (tally[key] > largest) {
      largest = tally[key];
    }
  }
  return largest;
};
const Irv = (arrayOfRankings) => {
  const countOfRankings = {}; //Initializes an empty object to count first-choice votes
  let total = arrayOfRankings.length; //Stores the total number of votes (rankings) for later use.

  for (let i = 0; i < arrayOfRankings.length; i++) {
    //Start a loop to go through each voter’s ranking
    if (!countOfRankings[arrayOfRankings[i][0]]) {
      //Check if this voter's first-choice candidate is not yet in the count
      countOfRankings[arrayOfRankings[i][0]] = 1; //If it’s not in the object, add it with a count of 1.
    } else {
      countOfRankings[arrayOfRankings[i][0]]++; //Otherwise, increase the vote count for that candidate
    }
  }
  //This will hold the highest number of first-place votes.
  let largest = findBiggest(countOfRankings);
  while (largest / arrayOfRankings.length <= 0.5) {
    // keep looping if nobody got 51% of votes
    const x = Object.values(countOfRankings).every((num) => num === largest); // every candidate has the same number of votes
    if (x) {
      //If it is a tie, move on to randomly eliminate one of the tied candidates.
      let y = randomDelete(Object.keys(countOfRankings)); //Picks one candidate at random from the list of candidates.

      console.log(y);
      delete countOfRankings[y]; //Logs the name of the eliminated candidate, then removes them from the count object
    } else {
    }
  }

  // numbers.every(num => num === numbers[0]);
  //   const x = Object.values(countOfRankings).every((num) => num === largest);
  //   console.log(x);
  console.log(countOfRankings);
};

// Irv(testRankings);
//console.log(randomDelete(["a", "b"]));

console.log(theSmallest(A));
