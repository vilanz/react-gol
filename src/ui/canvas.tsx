import { useEffect, useRef } from "react";
import { CELL_COLORS, CELL_SIZE } from "../defaults";
import { Board } from "../logic";
import { GameDispatch, GameState } from "../reducer";
import { getReffedValue } from "../utils";

export function getMouseEventCell(
  clickX: number,
  clickY: number,
  board: Board
) {
  const x = Math.floor((clickX + 1) / CELL_SIZE);
  const y = Math.floor((clickY + 1) / CELL_SIZE);
  if (x >= board.length || y >= board.length || x < 0 || y < 0) {
    return null;
  }
  return { x, y };
}

export function GameCanvas({
  state,
  dispatch,
}: {
  state: GameState;
  dispatch: GameDispatch;
}) {
  const { board, hoverPoint, userHasDrawn } = state;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // assuming our board is square
  const canvasSize = state.board.length * CELL_SIZE;

  useEffect(() => {
    const canvas2dCtx = canvasRef.current?.getContext("2d");
    if (!canvas2dCtx) {
      return;
    }
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        const isHovering = hoverPoint
          ? hoverPoint.x === x && hoverPoint.y === y
          : false;
        if (isHovering) {
          canvas2dCtx.fillStyle = CELL_COLORS.Hovering;
        } else {
          canvas2dCtx.fillStyle = board[y][x]
            ? CELL_COLORS.Live
            : CELL_COLORS.Dead;
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

  const boardRef = getReffedValue(board);

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
      if (!userHasDrawn) {
        dispatch({
          type: "USER_FINALLY_DREW_SOMETHING",
        });
      }
      isHoldingClick.current = !isHoldingClick.current;
      const cell = getMouseEventCell(e.offsetX, e.offsetY, boardRef.current);
      if (!cell) {
        return;
      }
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
      const cell = getMouseEventCell(e.offsetX, e.offsetY, boardRef.current);
      if (!cell) {
        return;
      }
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
