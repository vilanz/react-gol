import { Reducer, useEffect, useReducer, useRef, useState } from "react";
import {
  Board,
  getEmptyBoard,
  getRandomBoard,
  getUpdatedBoard,
} from "./logic/game-logic";
import { useDebouncedValue } from "./utils";

const BOARD_SIZE = 75;
const INITIAL_RANDOM_BIAS = 0.5;

export const MIN_SPEED = 0;
export const MAX_SPEED = 90;
const DEFAULT_SPEED = 81;

interface GameState {
  board: Board;
  generation: number;
  currentSpeed: number;
  isRunning: boolean;
}

type GameAction =
  | { type: "UPDATE_BOARD" }
  | { type: "RESET_BOARD" }
  | { type: "SET_SPEED"; payload: number };

const INITIAL_STATE: GameState = {
  board: getRandomBoard(BOARD_SIZE, INITIAL_RANDOM_BIAS),
  generation: 0,
  currentSpeed: DEFAULT_SPEED,
  isRunning: true,
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
  }
}

export const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  const { board, currentSpeed, generation, isRunning } = state;

  const debouncedSpeed = useDebouncedValue(currentSpeed, 50);

  const animationFrameRef = useRef<number | null>(null);
  useEffect(() => {
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
  }, [debouncedSpeed]);

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

  const speedPercentage = Math.round((currentSpeed / MAX_SPEED) * 100);

  return {
    board,
    generation,
    currentSpeed,
    speedPercentage,
    resetBoard,
    setSpeed,
  };
};
