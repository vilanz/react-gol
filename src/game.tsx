import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { GameRow } from './board';
import {
  getEmptyBoard, randomizeRow, Board, updateCellBoard,
} from './game-logic';

const BOARD_SIZE = 500;

export function Game() {
  const [board, setBoard] = React.useState<Board>(
    () => getEmptyBoard(BOARD_SIZE).map(randomizeRow),
  );

  React.useEffect(() => {
    const refresh = setInterval(() => {
      setBoard((b) => updateCellBoard(b));
    }, 3000);
    return () => clearInterval(refresh);
  }, []);

  return (
    <TransformWrapper>
      <TransformComponent>
        <div>
          {board.map((row, idx) => (
            // Row indexes are stable
            // eslint-disable-next-line react/no-array-index-key
            <GameRow row={row} key={idx} />
          ))}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}
