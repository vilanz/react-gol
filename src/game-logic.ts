import structuredClone from '@ungap/structured-clone';

export type BoardCell = number;
export type BoardRow = BoardCell[];
export type Board = BoardRow[];

function getLiveNeighourCount(rowIndex: number, colIndex: number, board: Board) {
  const neighbours = [
    [rowIndex - 1, colIndex - 1], [rowIndex - 1, colIndex], [rowIndex - 1, colIndex + 1],
    [rowIndex, colIndex - 1], [rowIndex, colIndex + 1],
    [rowIndex + 1, colIndex - 1], [rowIndex + 1, colIndex], [rowIndex + 1, colIndex + 1],
  ];
  const liveNeighbours = neighbours.filter(([x, y]) => board[x] && board[x][y]);
  return liveNeighbours.length;
}

function getCellStatus(cell: BoardCell, rowIndex: number, colIndex: number, board: Board): number {
  const neighbourCount = getLiveNeighourCount(rowIndex, colIndex, board);
  const alive = cell
    ? neighbourCount === 2 || neighbourCount === 3
    : neighbourCount === 3;
  return alive ? 1 : 0;
}

function getUpdatedRow(row: BoardRow, rowIdx: number, originalBoard: Board): BoardRow {
  return row.map((cell, cellIdx) => getCellStatus(cell, rowIdx, cellIdx, originalBoard));
}

export function getUpdatedBoard(originalBoard: Board) {
  return originalBoard.map((row, rowIdx) => getUpdatedRow(row, rowIdx, originalBoard));
}

export function getEmptyBoard(size: number): Board {
  return Array(size).fill([]).map(() => {
    const emptyRow = Array(size).fill(0);
    return emptyRow;
  });
}

export function randomizeRow(row: BoardRow): BoardRow {
  return row.map(() => (Math.random() > 0.5 ? 1 : 0));
}
