import { useEffect, useRef, useState } from 'react';
import { Board, getRandomBoard, getUpdatedBoard } from './game-logic';

const BOARD_SIZE = 75;
const INITIAL_RANDOM_BIAS = 0.5;

export const MIN_SPEED = 70;
export const MAX_SPEED = 400;

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

export const useBoard = () => {
  const [board, setBoard] = useState<Board>(
    getRandomBoard(BOARD_SIZE, INITIAL_RANDOM_BIAS),
  );
  const [generation, setGeneration] = useState(0);

  const [currentSpeed, setCurrentSpeed] = useState<number>(300);
  const debouncedSpeed = useDebouncedValue(currentSpeed, 100);

  const animationFrameRef = useRef<number | null>(null);
  useEffect(() => {
    let currentTime: number = 0;
    function gameLoop(time: number) {
      const delta = time - currentTime;
      if (delta >= debouncedSpeed) {
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

  return {
    board,
    generation,
    currentSpeed,
    resetBoard,
    setSpeed,
  };
};
