export type BoardCell = boolean;
export type BoardRow = BoardCell[];
export type Board = BoardRow[];

function getCountOfLiveNeighours(row: number, col: number, board: Board) {
  const neighbours = [
    [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
    [row, col - 1], [row, col + 1],
    [row + 1, col - 1], [row + 1, col], [row + 1, col + 1],
  ];
  const liveNeighbours = neighbours.filter(([r, c]) => board[r] && board[r][c]);
  return liveNeighbours.length;
}

function isCellNowAlive(
  row: number,
  col: number,
  board: Board,
): BoardCell {
  const wasAlive = board[row][col];
  const liveNeighbourCount = getCountOfLiveNeighours(row, col, board);
  return wasAlive
    ? liveNeighbourCount === 2 || liveNeighbourCount === 3
    : liveNeighbourCount === 3;
}

export function getUpdatedBoard(board: Board): Board {
  const newBoard: Board = [];
  for (let row = 0; row < board.length; row++) {
    newBoard[row] = [];
    for (let col = 0; col < board[row].length; col++) {
      newBoard[row][col] = isCellNowAlive(row, col, board);
    }
  }
  return newBoard;
}

export function getEmptyBoard(size: number): Board {
  return Array(size).fill([]).map(() => {
    const emptyRow = Array(size).fill(0);
    return emptyRow;
  });
}

export function randomizeRow(row: BoardRow): BoardRow {
  return row.map(() => (Math.random() > 0.5));
}
