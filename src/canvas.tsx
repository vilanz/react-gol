import { memo, useEffect, useRef } from "react";
import { Board } from "./logic/game-logic";

const CELL_SIZE = 5;

export function getClickPosition(clickX: number, clickY: number) {
  const x = Math.floor(clickX / CELL_SIZE);
  const y = Math.floor(clickY / CELL_SIZE);
  return [x, y];
}

export const GameCanvas = memo(
  ({
    board,
    onDraw,
  }: {
    board: Board;
    onDraw: (x: number, y: number) => void;
  }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvas2dCtx = canvasRef.current?.getContext("2d");

    const onDrawRef = useRef(onDraw);
    useEffect(() => {
      onDrawRef.current = onDraw;
    }, [onDraw]);

    // assuming our board is square
    const canvasSize = board.length * CELL_SIZE;

    useEffect(() => {
      if (!canvas2dCtx) {
        return;
      }
      for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
        for (let colIdx = 0; colIdx < board[rowIdx].length; colIdx++) {
          canvas2dCtx.fillStyle = board[rowIdx][colIdx] ? "black" : "white";
          canvas2dCtx.fillRect(
            colIdx * CELL_SIZE,
            rowIdx * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
          );
        }
      }
    }, [board, canvas2dCtx]);

    useEffect(() => {
      canvasRef.current?.addEventListener("click", (e) => {
        const [eqX, eqY] = getClickPosition(e.offsetX, e.offsetY);
        onDrawRef.current?.(eqX, eqY);
      });
    }, []);

    return <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />;
  }
);
