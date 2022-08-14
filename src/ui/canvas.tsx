import { useEffect, useRef } from "react";
import { CELL_SIZE } from "../defaults";
import { GameDispatch, GameState } from "../reducer";
import { getReffedValue } from "../utils";

export function getMouseEventCell(clickX: number, clickY: number) {
  const x = Math.floor(clickX / CELL_SIZE);
  const y = Math.floor(clickY / CELL_SIZE);
  return { x, y };
}

export function GameCanvas({
  state,
  dispatch,
}: {
  state: GameState;
  dispatch: GameDispatch;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // assuming our board is square
  const canvasSize = state.board.length * CELL_SIZE;

  useEffect(() => {
    const canvas2dCtx = canvasRef.current?.getContext("2d");
    if (!canvas2dCtx) {
      return;
    }
    for (let y = 0; y < state.board.length; y++) {
      for (let x = 0; x < state.board[y].length; x++) {
        const isHovering = state.hoverPoint
          ? state.hoverPoint.x === x && state.hoverPoint.y === y
          : false;
        if (isHovering) {
          canvas2dCtx.fillStyle = "pink";
        } else {
          canvas2dCtx.fillStyle = state.board[y][x] ? "black" : "white";
        }
        canvas2dCtx.fillRect(
          x * CELL_SIZE,
          y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }
  }, [state.board, state.hoverPoint]);

  const boardRef = getReffedValue(state.board);

  const isHoldingClick = useRef(false);
  const willBeErasing = useRef(false);
  useEffect(() => {
    const canvas2dCtx = canvasRef.current?.getContext("2d");
    if (!canvas2dCtx) {
      return;
    }
    canvasRef.current?.addEventListener("mouseup", (e) => {
      isHoldingClick.current = !isHoldingClick.current;
    });

    canvasRef.current?.addEventListener("mousedown", (e) => {
      isHoldingClick.current = !isHoldingClick.current;
      const cell = getMouseEventCell(e.offsetX, e.offsetY);
      willBeErasing.current = boardRef.current?.[cell.y]?.[cell.x];
      dispatch({
        type: "DRAW_POINT",
        payload: {
          x: cell.x,
          y: cell.y,
          erase: willBeErasing.current,
        },
      });
    });

    canvasRef.current?.addEventListener("mousemove", (e) => {
      const cell = getMouseEventCell(e.offsetX, e.offsetY);
      dispatch({
        type: "HOVER_POINT",
        payload: {
          x: cell.x,
          y: cell.y,
        },
      });
      if (isHoldingClick.current) {
        const erase = willBeErasing.current;
        dispatch({
          type: "DRAW_POINT",
          payload: {
            x: cell.x,
            y: cell.y,
            erase,
          },
        });
      }
    });
  }, []);

  return <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />;
}
