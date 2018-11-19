import { universe as createUniverse } from "./src/universe";

console.group("UNIVERSE");

const universe = document.querySelector(".universe");
const world = document.querySelector(".world");

createUniverse(universe, world);

console.groupEnd("UNIVERSE");
