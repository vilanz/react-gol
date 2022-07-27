import { useEffect, useRef, useState } from 'react';
import { Board, getRandomBoard, getUpdatedBoard } from './game-logic';

const BOARD_SIZE = 75;
const INITIAL_RANDOM_BIAS = 0.5;

export const MIN_SPEED = 0;
export const MAX_SPEED = 90;
const DEFAULT_SPEED = 81;

const useDebouncedValue = <T extends unknown>(value: T, time: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const changeTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, time);
    return () => {
      clearTimeout(changeTimeout);
    };
  }, [value, time]);
  return debouncedValue;
};

export const useGame = () => {
  const [board, setBoard] = useState<Board>(
    getRandomBoard(BOARD_SIZE, INITIAL_RANDOM_BIAS),
  );
  const [generation, setGeneration] = useState(0);

  const [currentSpeed, setCurrentSpeed] = useState<number>(DEFAULT_SPEED);
  const debouncedSpeed = useDebouncedValue(currentSpeed, 50);

  const animationFrameRef = useRef<number | null>(null);
  useEffect(() => {
    let currentTime: number = 0;
    function gameLoop(time: number) {
      const delta = time - currentTime;
      const updateAtXMs = (1000 * ((100 - debouncedSpeed) / 100));
      if (debouncedSpeed > 0 && delta >= updateAtXMs) {
        currentTime = time;
        setBoard((b) => getUpdatedBoard(b));
        setGeneration((g) => g + 1);
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
    setCurrentSpeed(speed);
  };

  const resetBoard = () => {
    setBoard(getRandomBoard(BOARD_SIZE, INITIAL_RANDOM_BIAS));
    setGeneration(0);
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
