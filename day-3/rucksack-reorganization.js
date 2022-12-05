import fs from "fs";

function main() {
  const input = fs.readFileSync("./day-3/input.txt", "utf-8");
  const rucksacks = input.split("\n");

  const divideCompartments = (rucksack) => {
    const middleIndex = rucksack.length / 2;
    const firstCompartment = rucksack.slice(0, middleIndex);
    const secondCompartment = rucksack.slice(middleIndex);
    return [firstCompartment, secondCompartment];
  };

  const getSharedType = (rucksack) => {
    const [firstCompartment, secondCompartment] = divideCompartments(rucksack);
    const firstCompartmentTypes = new Set([...firstCompartment]);
    const secondCompartmentTypes = new Set([...secondCompartment]);
    return [...secondCompartmentTypes].find((type) =>
      firstCompartmentTypes.has(type)
    );
  };

  const getPriority = (itemType) => {
    const charCode = itemType.charCodeAt();
    if (charCode >= 65 && charCode < 91) {
      return charCode - 38;
    } else if (charCode >= 97 && charCode < 123) {
      return charCode - 96;
    }
  };

  const prioritiesSum = rucksacks
    .map((rucksack) => {
      const sharedType = getSharedType(rucksack);
      return getPriority(sharedType);
    })
    .reduce((total, curr) => total + curr);

  console.log("First part solution: ", prioritiesSum);

  const groupsOf3 = [];

  for (let i = 0; i < rucksacks.length; i += 3) {
    groupsOf3.push([rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]]);
  }

  const getBadge = (group) => {
    const [first, second, third] = group.map((rucksack) => new Set(rucksack));
    const badge = [...first].find(
      (item) => second.has(item) && third.has(item)
    );
    return badge;
  };

  let prioritiesSum2 = groupsOf3
    .map((group) => getBadge(group))
    .map((badge) => getPriority(badge))
    .reduce((total, curr) => total + curr);

  console.log("Second part solution: ", prioritiesSum2);
}

main();
