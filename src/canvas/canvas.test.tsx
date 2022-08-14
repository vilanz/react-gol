import { getMouseEventCell } from "./";

it.each([
  [0, 0, [0, 0]],
  [3, 3, [0, 0]],
  [5, 5, [1, 1]],
  [3, 17, [0, 3]],
])("should return the appropriate X/Y for a click", (x, y, expected) => {
  expect(getMouseEventCell(x, y)).toEqual(expected);
});
