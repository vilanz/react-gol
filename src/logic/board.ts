export type BoardCell = boolean;
export type BoardRow = BoardCell[];
export type Board = BoardRow[];

export function createEmptyBoard(width: number, height: number): Board {
  return Array(height)
    .fill([])
    .map(() => Array(width).fill(0));
}

export function drawPointInBoard(
  board: Board,
  x: number,
  y: number,
  erase: boolean
): Board {
  const newBoard: Board = [];
  for (let row = 0; row < board.length; row++) {
    newBoard[row] = [];
    for (let col = 0; col < board[row].length; col++) {
      newBoard[row][col] = board[row][col];
    }
  }
  newBoard[y][x] = !erase;
  return newBoard;
}

function getCountOfLiveNeighours(x: number, y: number, board: Board) {
  let count = 0;

  // iterate over all 8 neighbours' positions
  for (let row = y - 1; row <= y + 1 && row > 0 && row < board.length; row++) {
    for (
      let col = x - 1;
      col <= x + 1 && col > 0 && col < board[row].length;
      col++
    ) {
      if (row === x && col === y) {
        // ignore our own position, of course
        continue;
      }
      const isNeighbourAlive = board[row][col];
      if (isNeighbourAlive) {
        count++;
      }
    }
  }

  return count;
}

function isCellNowAlive(x: number, y: number, board: Board): BoardCell {
  const wasAlive = board[y][x];
  const liveNeighbourCount = getCountOfLiveNeighours(x, y, board);
  return wasAlive
    ? liveNeighbourCount === 2 || liveNeighbourCount === 3
    : liveNeighbourCount === 3;
}

export function getNextGeneration(board: Board): Board {
  const newBoard: Board = [];
  for (let y = 0; y < board.length; y++) {
    newBoard[y] = [];
    for (let x = 0; x < board[y].length; x++) {
      newBoard[y][x] = isCellNowAlive(x, y, board);
    }
  }
  return newBoard;
}
