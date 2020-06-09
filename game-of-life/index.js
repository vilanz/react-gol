function getEmptyCellBoard() {
  return [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]
}
module.exports.getEmptyCellBoard = updateCells;

function updateCellBoard (cells) {
  return cells.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      return getCellState(cell, rowIndex, colIndex, cells) ? 1 : 0;
    })
  })
}
module.exports.updateCellBoard = updateCellBoard;

function getCellState(cell, rowIndex, colIndex, allCells) {
  const neighbourCount = getLiveNeighourCount(rowIndex, colIndex, allCells);
  if (cell) {
    return neighbourCount === 2 || neighbourCount === 3 
  } else {
    return neighbourCount === 3
  }
}

function getLiveNeighourCount(rowIndex, colIndex, allCells) {
  const neighbours = [
    [rowIndex - 1, colIndex - 1], [rowIndex - 1, colIndex], [rowIndex - 1, colIndex + 1],
    [rowIndex, colIndex - 1], [rowIndex, colIndex + 1],
    [rowIndex + 1, colIndex - 1], [rowIndex + 1, colIndex], [rowIndex + 1, colIndex + 1],
  ];
  const liveNeighbours = neighbours.filter(([x, y]) => {
    try {
      return allCells[x][y];
    } catch (_) {
      return false;
    }
  });
  return liveNeighbours.length;
}
