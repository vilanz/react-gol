import { useEffect, useRef, useState } from 'react';
import { Board, getRandomBoard, getUpdatedBoard } from './game-logic';

const BOARD_SIZE = 75;
const UPDATE_EVERY_X_MS = 120;
const INITIAL_RANDOM_BIAS = 0.5;

export const useBoard = () => {
  const [board, setBoard] = useState<Board>(
    getRandomBoard(BOARD_SIZE, INITIAL_RANDOM_BIAS),
  );
  const [generation, setGeneration] = useState(0);

  const resetBoard = () => {
    setBoard(getRandomBoard(BOARD_SIZE, INITIAL_RANDOM_BIAS));
    setGeneration(0);
  };

  const animationFrameRef = useRef<number | null>(null);
  useEffect(() => {
    let currentTime: number = 0;
    function gameLoop(time: number) {
      const delta = time - currentTime;
      if (delta >= UPDATE_EVERY_X_MS) {
        currentTime = time;
        setBoard((b) => getUpdatedBoard(b));
        setGeneration((g) => g + 1);
      }
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current !== null) {
        animationFrameRef.current = null;
        cancelAnimationFrame(animationFrameRef.current!);
      }
    };
  }, []);

  return {
    board,
    generation,
    resetBoard,
  };
};
