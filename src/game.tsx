import React from 'react';
import { GameRow } from './board';
import {
  getEmptyBoard, randomizeRow, Board, updateCellBoard,
} from './game-logic';

export function Game() {
  const [board, setBoard] = React.useState<Board>(
    () => getEmptyBoard(60).map(randomizeRow),
  );

  React.useEffect(() => {
    const refresh = setInterval(() => {
      setBoard((b) => updateCellBoard(b));
    }, 300);
    return () => clearInterval(refresh);
  }, []);

  return (
    <div>
      {board.map((row, idx) => (
        // Row indexes are stable
        // eslint-disable-next-line react/no-array-index-key
        <GameRow row={row} key={idx} />
      ))}
    </div>
  );
}
