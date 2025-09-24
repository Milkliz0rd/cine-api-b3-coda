import { sum } from "../src/utils/sum.js";

test("addtionne 2+3 =5 ", () => {
  expect(sum(2, 3)).toBe(5);
});
