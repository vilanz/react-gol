export type BoardCell = boolean;
export type BoardRow = BoardCell[];
export type Board = BoardRow[];

function getCountOfLiveNeighours(row: number, col: number, board: Board) {
  let count = 0;

  // iterate over all 8 neighbours' positions
  for (let x = row - 1; x <= row + 1; x++) {
    for (let y = col - 1; y <= col + 1; y++) {
      if (x === row && col === y) {
        // ignore our own position, of course
        continue;
      }
      const isNeighbourAlive = board?.[x]?.[y];
      if (isNeighbourAlive) {
        count++;
      }
    }
  }

  return count;
}

function isCellNowAlive(row: number, col: number, board: Board): BoardCell {
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
  return Array(size)
    .fill([])
    .map(() => {
      const emptyRow = Array(size).fill(0);
      return emptyRow;
    });
}

export function getRandomBoard(size: number, bias: number): Board {
  return getEmptyBoard(size).map((row) => row.map(() => Math.random() > bias));
}
