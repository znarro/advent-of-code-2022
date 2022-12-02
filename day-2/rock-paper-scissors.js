import fs from "fs";

function main() {
  const input = fs.readFileSync("./day-2/input.txt", "utf-8");

  const shapePoints = { rock: 1, paper: 2, scissors: 3 };

  const outcomePoints = { lost: 0, draw: 3, win: 6 };

  const possibleResults = {
    lost: ["B X", "C Y", "A Z"],
    draw: ["A X", "B Y", "C Z"],
    win: ["C X", "A Y", "B Z"],
  };

  const rounds = input.split("\n");

  const getScore = (round) => {
    let score = 0;

    // Outcome points
    for (let result in possibleResults) {
      if (possibleResults[result].includes(round)) {
        score += outcomePoints[result];
      }
    }

    const [_opponent, me] = round.split(" ");

    // Shape points
    switch (me) {
      case "X":
        score += shapePoints.rock;
        break;
      case "Y":
        score += shapePoints.paper;
        break;
      case "Z":
        score += shapePoints.scissors;
        break;
      default:
        break;
    }

    return score;
  };

  const totalScore = rounds
    .map((round) => getScore(round))
    .reduce((total, curr) => total + curr);
  console.log("First part solution: ", totalScore);

  const desiredResults = {
    X: "lost",
    Y: "draw",
    Z: "win",
  };

  const getDesiredScore = (round) => {
    let score = 0;

    const [opponentChoice, desired] = round.split(" ");
    const desiredResult = desiredResults[desired];

    // Outcome points
    score += outcomePoints[desiredResult];

    // Shape points
    const [_opponent, myChoice] = possibleResults[desiredResult]
      .find((possibleResult) => opponentChoice === possibleResult[0])
      .split(" ");

    switch (myChoice) {
      case "X":
        score += shapePoints.rock;
        break;
      case "Y":
        score += shapePoints.paper;
        break;
      case "Z":
        score += shapePoints.scissors;
        break;
      default:
        break;
    }

    return score;
  };

  const desiredScore = rounds
    .map((round) => getDesiredScore(round))
    .reduce((total, curr) => total + curr);
  console.log("Second part solution: ", desiredScore);
}

main();
