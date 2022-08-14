import { memo, useEffect, useRef } from "react";
import { Board } from "./logic/game-logic";
import { getReffedValue } from "./utils";

const CELL_SIZE = 8;

export function getMouseEventCell(clickX: number, clickY: number) {
  const x = Math.floor(clickX / CELL_SIZE);
  const y = Math.floor(clickY / CELL_SIZE);
  return [x, y];
}

export const GameCanvas = memo(
  ({
    board,
    hoverPoint,
    onDraw,
    onHover,
  }: {
    board: Board;
    hoverPoint: null | [number, number];
    onDraw: (x: number, y: number, erase: boolean) => void;
    onHover: (x: number, y: number) => void;
  }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // assuming our board is square
    const canvasSize = board.length * CELL_SIZE;

    useEffect(() => {
      const canvas2dCtx = canvasRef.current?.getContext("2d");
      if (!canvas2dCtx) {
        return;
      }
      for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
          const isHovering = hoverPoint
            ? hoverPoint[0] === x && hoverPoint[1] === y
            : false;
          if (isHovering) {
            canvas2dCtx.fillStyle = "pink";
          } else {
            canvas2dCtx.fillStyle = board[y][x] ? "black" : "white";
          }
          canvas2dCtx.fillRect(
            x * CELL_SIZE,
            y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
          );
        }
      }
    }, [board, hoverPoint]);

    const onDrawRef = getReffedValue(onDraw);
    const onHoverRef = getReffedValue(onHover);
    const boardRef = getReffedValue(board);

    const holdingClick = useRef(false);
    const startedHoldingFromLiveCell = useRef(false);
    useEffect(() => {
      const canvas2dCtx = canvasRef.current?.getContext("2d");
      if (!canvas2dCtx) {
        return;
      }
      canvasRef.current?.addEventListener("mousedown", (e) => {
        holdingClick.current = !holdingClick.current;
        const [eqX, eqY] = getMouseEventCell(e.offsetX, e.offsetY);
        const erase = boardRef.current?.[eqY]?.[eqX];
        onDrawRef.current?.(eqX, eqY, erase);
        startedHoldingFromLiveCell.current = erase;
      });
      canvasRef.current?.addEventListener("mouseup", (e) => {
        holdingClick.current = !holdingClick.current;
      });
      canvasRef.current?.addEventListener("mousemove", (e) => {
        const [eqX, eqY] = getMouseEventCell(e.offsetX, e.offsetY);
        onHoverRef.current?.(eqX, eqY);
        if (holdingClick.current) {
          const erase = startedHoldingFromLiveCell.current;
          onDrawRef.current?.(eqX, eqY, erase);
        }
      });
    }, []);

    return <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />;
  }
);
