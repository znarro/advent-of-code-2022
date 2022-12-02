import fs from "fs";

function main() {
  try {
    const input = fs.readFileSync("./day-1/input.txt", "utf8");

    const elves = input.split("\n\n");

    const totalCalories = elves.map((elf) => {
      const elfCalories = elf.split("\n");
      return elfCalories.reduce((total, curr) => +total + +curr, 0);
    });

    const max = Math.max(...totalCalories);
    console.log("First part solution: ", max);

    const orderedCalories = totalCalories.sort((a, b) => b - a);
    const topThreeSum = orderedCalories.reduce((total, curr, idx) => (idx <= 2 ? total + curr : total), 0);
    console.log("Second part solution: ", topThreeSum);
  } catch (error) {
    console.error(error);
  }
}

main();
