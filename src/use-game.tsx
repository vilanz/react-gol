import { useEffect, useReducer, useRef } from "react";
import {
  Board,
  getBoardWithNewPoint,
  getEmptyBoard,
  getUpdatedBoard,
} from "./logic";
import { useDebouncedValue } from "./utils";

const BOARD_SIZE = 75;
export const MIN_SPEED = 0;
export const MAX_SPEED = 90;
const DEFAULT_SPEED = 81;

interface GameState {
  board: Board;
  generation: number;
  currentSpeed: number;
  hoverPoint: null | [number, number];
  isRunning: boolean;
}

type GameAction =
  | { type: "UPDATE_BOARD" }
  | { type: "RESET_BOARD" }
  | { type: "TOGGLE_RUNNING" }
  | { type: "SET_SPEED"; payload: number }
  | { type: "HOVER_POINT"; payload: null | [number, number] }
  | { type: "DRAW_POINT"; payload: { x: number; y: number; erase: boolean } };

const INITIAL_STATE: GameState = {
  board: getEmptyBoard(BOARD_SIZE),
  generation: 0,
  currentSpeed: DEFAULT_SPEED,
  hoverPoint: null,
  isRunning: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "UPDATE_BOARD":
      return {
        ...state,
        board: getUpdatedBoard(state.board),
        generation: state.generation + 1,
      };
    case "RESET_BOARD":
      return INITIAL_STATE;
    case "SET_SPEED":
      return {
        ...state,
        currentSpeed: action.payload,
      };
    case "TOGGLE_RUNNING":
      return {
        ...state,
        isRunning: !state.isRunning,
      };
    case "HOVER_POINT":
      return { ...state, hoverPoint: action.payload };
    case "DRAW_POINT":
      const { x, y, erase } = action.payload;
      return {
        ...state,
        board: getBoardWithNewPoint(state.board, x, y, erase),
      };
  }
}

export const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  const { board, currentSpeed, generation, isRunning, hoverPoint } = state;

  const debouncedSpeed = useDebouncedValue(currentSpeed, 50);

  const animationFrameRef = useRef<number | null>(null);
  useEffect(() => {
    if (!isRunning) {
      return;
    }
    let currentTime: number = 0;
    function gameLoop(time: number) {
      const delta = time - currentTime;
      const updateAtXMs = 1000 * ((100 - debouncedSpeed) / 100);
      if (debouncedSpeed > 0 && delta >= updateAtXMs) {
        currentTime = time;
        dispatch({
          type: "UPDATE_BOARD",
        });
      }
      if (animationFrameRef.current !== null) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
      }
    }
    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current!);
        animationFrameRef.current = null;
      }
    };
  }, [debouncedSpeed, isRunning]);

  const setSpeed = (speed: number) => {
    if (speed < MIN_SPEED || speed > MAX_SPEED) {
      return;
    }
    dispatch({
      type: "SET_SPEED",
      payload: speed,
    });
  };

  const resetBoard = () => {
    dispatch({
      type: "RESET_BOARD",
    });
  };

  const toggleRunning = () => {
    dispatch({
      type: "TOGGLE_RUNNING",
    });
  };

  const drawPoint = (x: number, y: number, erase: boolean) => {
    dispatch({
      type: "DRAW_POINT",
      payload: { x, y, erase },
    });
  };

  const onHover = (x: number, y: number) => {
    dispatch({
      type: "HOVER_POINT",
      payload: [x, y],
    });
  };

  const speedPercentage = Math.round((currentSpeed / MAX_SPEED) * 100);

  return {
    board,
    generation,
    currentSpeed,
    isRunning,
    toggleRunning,
    speedPercentage,
    resetBoard,
    setSpeed,
    drawPoint,
    hoverPoint,
    onHover,
  };
};
