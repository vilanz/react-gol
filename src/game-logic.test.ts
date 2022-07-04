import { getUpdatedBoard } from './game-logic';

describe('still life (stays the same forever)', () => {
  test('4x4 block', () => {
    const cells = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ];
    expect(getUpdatedBoard(cells)).toEqual(cells);
  });
  test('beehive', () => {
    const cells = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    expect(getUpdatedBoard(cells)).toEqual(cells);
  });
});

describe('oscillating life', () => {
  test('line', () => {
    const stateOne = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    const stateTwo = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    const firstTick = getUpdatedBoard(stateOne);

    expect(firstTick).toEqual(stateTwo);

    const secondTick = getUpdatedBoard(firstTick);

    expect(secondTick).toEqual(stateOne);
  });
});
