import { useLayoutEffect, useRef, useState } from 'react';
import { GameBoard } from './board';
import {
  getEmptyBoard, randomizeRow, Board, getUpdatedBoard,
} from './game-logic';

const BOARD_SIZE = 100;
const UPDATE_EVERY_X_MS = 42;

const INITIAL_BOARD = () => getEmptyBoard(BOARD_SIZE).map(randomizeRow);

export function Game() {
  const useEffectCalled = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const [board, setBoard] = useState<Board>(
    INITIAL_BOARD,
  );

  useLayoutEffect(() => {
    if (useEffectCalled.current === true) {
      return () => { };
    }
    useEffectCalled.current = true;

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
      <GameBoard board={board} />
    </div>
  );
}
