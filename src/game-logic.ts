export type BoardCell = number;
export type BoardRow = BoardCell[];
export type Board = BoardRow[];

function getLiveNeighourCount(rowIndex: number, colIndex: number, board: Board) {
  const neighbours = [
    [rowIndex - 1, colIndex - 1], [rowIndex - 1, colIndex], [rowIndex - 1, colIndex + 1],
    [rowIndex, colIndex - 1], [rowIndex, colIndex + 1],
    [rowIndex + 1, colIndex - 1], [rowIndex + 1, colIndex], [rowIndex + 1, colIndex + 1],
  ];
  const liveNeighbours = neighbours.filter(([x, y]) => {
    try {
      return board[x][y];
    } catch (_) {
      return false;
    }
  });
  return liveNeighbours.length;
}

function isCellAlive(cell: BoardCell, rowIndex: number, colIndex: number, board: Board) {
  const neighbourCount = getLiveNeighourCount(rowIndex, colIndex, board);
  if (cell) {
    return neighbourCount === 2 || neighbourCount === 3;
  }
  return neighbourCount === 3;
}

export function updateCellBoard(cells: Board) {
  return cells.map((row, rowIndex) => row.map((cell, colIndex) => (
    isCellAlive(cell, rowIndex, colIndex, cells)
      ? 1
      : 0
  )));
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
