import {
  memo, useEffect, useRef,
} from 'react';
import { Board } from './game-logic';

const CELL_SIZE = 5;

export const GameBoard = memo(({ board }: { board: Board }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvas2dCtx = canvasRef.current?.getContext('2d');

  // assuming our board is square
  const canvasSize = board.length * CELL_SIZE;

  useEffect(() => {
    if (!canvas2dCtx) {
      return;
    }
    for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
      for (let colIdx = 0; colIdx < board[rowIdx].length; colIdx++) {
        canvas2dCtx.fillStyle = board[rowIdx][colIdx] ? 'black' : 'white';
        canvas2dCtx.fillRect(colIdx * CELL_SIZE, rowIdx * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }, [board, canvas2dCtx]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
    />
  );
});
