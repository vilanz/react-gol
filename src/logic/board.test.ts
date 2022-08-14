import { getUpdatedBoard } from ".";

describe("still life (stays the same forever)", () => {
  test("4x4 block", () => {
    const cells = [
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ];
    expect(getUpdatedBoard(cells)).toEqual(cells);
  });
  test("beehive", () => {
    const cells = [
      [false, false, false, false, false, false],
      [false, false, true, true, false, false],
      [false, true, false, false, true, false],
      [false, false, true, true, false, false],
      [false, false, false, false, false, false],
    ];
    expect(getUpdatedBoard(cells)).toEqual(cells);
  });
});

describe("oscillating life", () => {
  test("line", () => {
    const stateOne = [
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ];
    const stateTwo = [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, true, true, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ];

    const firstTick = getUpdatedBoard(stateOne);

    expect(firstTick).toEqual(stateTwo);

    const secondTick = getUpdatedBoard(firstTick);

    expect(secondTick).toEqual(stateOne);
  });
});
