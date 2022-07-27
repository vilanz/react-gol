import {
  useEffect, useRef, useState,
} from 'react';
import { GameBoard } from './board';
import {
  Board, getUpdatedBoard, getRandomBoard,
} from './game-logic';

const BOARD_SIZE = 75;
const UPDATE_EVERY_X_MS = 120;
const INITIAL_RANDOM_BIAS = 0.5;

const customRandomBoard = () => getRandomBoard(BOARD_SIZE, INITIAL_RANDOM_BIAS);

export function Game() {
  const animationFrameRef = useRef<number | null>(null);
  const [board, setBoard] = useState<Board>(
    customRandomBoard(),
  );

  const resetBoard = () => {
    setBoard(customRandomBoard());
  };

  useEffect(() => {
    let currentTime: number = 0;
    function gameLoop(time: number) {
      const delta = time - currentTime;
      if (delta >= UPDATE_EVERY_X_MS) {
        currentTime = time;
        setBoard((b) => getUpdatedBoard(b));
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

  return (
    <div className="board-container">
      <h2>Game of Life</h2>
      <GameBoard board={board} />
      <button type="button" onClick={resetBoard}>Reset</button>
    </div>
  );
}
