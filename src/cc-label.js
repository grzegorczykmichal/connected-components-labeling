import { scaner } from "./scaner";

const ccl = (array, w, h, isBlank = x => x === 0) => {
  const s = scaner(array, w, h);
  const [, lastLabel] = s.firstScan();
  return { array: s.secondScan(), lastLabel: lastLabel, equivalencyList: {} };
};

export { ccl };
