import { memo, useEffect, useRef } from "react";
import { Board } from "./logic/game-logic";

const CELL_SIZE = 8;

export function getMouseEventCell(clickX: number, clickY: number) {
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

    const onDrawRef = useRef(onDraw);
    useEffect(() => {
      onDrawRef.current = onDraw;
    }, [onDraw]);

    // assuming our board is square
    const canvasSize = board.length * CELL_SIZE;

    useEffect(() => {
      const canvas2dCtx = canvasRef.current?.getContext("2d");
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
    }, [board]);

    const latestMousemove = useRef({ x: 0, y: 0, wasAlive: false });
    const holdingClick = useRef(false);
    useEffect(() => {
      const canvas2dCtx = canvasRef.current?.getContext("2d");
      if (!canvasRef.current || !canvas2dCtx) {
        return;
      }
      canvasRef.current?.addEventListener("mousedown", (e) => {
        holdingClick.current = !holdingClick.current;
      });
      canvasRef.current?.addEventListener("mouseup", (e) => {
        holdingClick.current = !holdingClick.current;
      });
      canvasRef.current?.addEventListener("mousemove", (e) => {
        const latestMousemoveCurrent = latestMousemove.current;
        const [eqX, eqY] = getMouseEventCell(e.offsetX, e.offsetY);
        if (
          eqX === latestMousemoveCurrent.x &&
          eqY === latestMousemoveCurrent.y
        ) {
          return;
        }
        const isAlive = board[eqY][eqX];
        latestMousemove.current = {
          x: eqX,
          y: eqY,
          wasAlive: isAlive,
        };
        if (holdingClick.current) {
          onDrawRef.current?.(eqX, eqY);
        } else {
          canvas2dCtx.fillStyle = latestMousemoveCurrent.wasAlive
            ? "black"
            : "white";
          canvas2dCtx.fillRect(
            latestMousemoveCurrent.x * CELL_SIZE,
            latestMousemoveCurrent.y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
          );
          canvas2dCtx.fillStyle = "pink";
          canvas2dCtx.fillRect(
            eqX * CELL_SIZE,
            eqY * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
          );
        }
      });
    }, []);

    return <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />;
  }
);
