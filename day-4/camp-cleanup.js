import fs from "fs";

function main() {
  const input = fs.readFileSync("./day-4/input.txt", "utf-8");

  const pairs = input.split("\n");

  const getSections = (elf) => {
    const [firstSection, lastSection] = elf.split("-");
    return [+firstSection, +lastSection];
  };

  const checkOverlap = (pair) => {
    const [firstElf, secondElf] = pair.split(",");
    const [firstSection, lastSection] = getSections(firstElf);
    const [firstSection2, lastSection2] = getSections(secondElf);

    return (
      (firstSection <= firstSection2 && lastSection >= lastSection2) ||
      (firstSection2 <= firstSection && lastSection2 >= lastSection)
    );
  };

  const fullyContainsLen = pairs.filter((pair) => checkOverlap(pair)).length;

  console.log("First part solution: ", fullyContainsLen);

  const checkOverlapAtAll = (pair) => {
    const [firstElf, secondElf] = pair.split(",");
    const [firstSection, lastSection] = getSections(firstElf);
    const [firstSection2, lastSection2] = getSections(secondElf);

    return (
      (firstSection >= firstSection2 && firstSection <= lastSection2) ||
      (lastSection >= firstSection2 && lastSection <= lastSection2) ||
      (firstSection2 >= firstSection && firstSection2 <= lastSection) ||
      (lastSection2 >= firstSection && lastSection2 <= lastSection)
    );
  };

  const overlapAtAll = pairs.filter((pair) => checkOverlapAtAll(pair)).length;

  console.log("Second part solution: ", overlapAtAll);
}

main();
