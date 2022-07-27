import { memo } from 'react';
import { BoardCell, BoardRow, Board } from './game-logic';

export const GameCell = memo(({ cell }: { cell: BoardCell }) => (
  <div className={`game-cell ${cell ? 'alive' : ''}`} />));

export const GameRow = memo(({ row }: { row: BoardRow }) => (
  <div className="game-row">
    {row.map((cell, idx) => (
      // Cell indexes are stable too
      // eslint-disable-next-line react/no-array-index-key
      <GameCell cell={cell} key={idx} />
    ))}
  </div>
));

export const GameBoard = memo(({ board }: { board: Board }) => (
  <div className="game-board">
    {board.map((row, idx) => (
      // Row indexes are stable
      // eslint-disable-next-line react/no-array-index-key
      <GameRow row={row} key={idx} />
    ))}
  </div>
));
