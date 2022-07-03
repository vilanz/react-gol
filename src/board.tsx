import React from 'react';
import { BoardCell, BoardRow } from './game-logic';

export function GameCell({ cell }: { cell: BoardCell }) {
  return <div className={`game-cell ${cell ? 'alive' : 'dead'}`} />;
}

export function GameRow({ row }: { row: BoardRow }) {
  return (
    <div className="game-row">
      {row.map((cell, idx) => (
        // Cell indexes are stable too
        // eslint-disable-next-line react/no-array-index-key
        <GameCell cell={cell} key={idx} />
      ))}
    </div>
  );
}
