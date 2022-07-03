import React from 'react';
import {
  getEmptyBoard, randomizeRow, Board, updateCellBoard,
} from './game-logic';

const randomizedBoard = getEmptyBoard().map(randomizeRow);

export function Game() {
  const [board, setBoard] = React.useState<Board>(randomizedBoard);

  React.useEffect(() => {
    const refresh = setInterval(() => {
      setBoard((b) => updateCellBoard(b));
    }, 1000);
    return () => clearInterval(refresh);
  }, []);

  return (
    <div>
      {board.map((row, idx) => (
        <div style={{ display: 'flex' }} key={idx}>
          {row.map((cell) => (
            <div
              style={{
                height: '50px',
                width: '50px',
                backgroundColor: cell ? 'orange' : 'black',
                transition: 'background-color 0.5s ease',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
