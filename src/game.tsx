import React, { useLayoutEffect, useRef, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { GameRow } from './board';
import {
  getEmptyBoard, randomizeRow, Board, getUpdatedBoard,
} from './game-logic';

const BOARD_SIZE = 300;
const UPDATE_EVERY_X_MS = 1000;

const INITIAL_BOARD = () => getEmptyBoard(BOARD_SIZE).map(randomizeRow);

export function Game() {
  const useEffectCalled = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const [board, setBoard] = useState<Board>(
    INITIAL_BOARD,
  );

  useLayoutEffect(() => {
    if (useEffectCalled.current === true) {
      return () => {};
    }
    useEffectCalled.current = true;

    let currentTime: number = 0;
    function gameLoop(time: number) {
      const delta = time - currentTime;
      if (delta >= UPDATE_EVERY_X_MS) {
        setBoard((b) => getUpdatedBoard(b));
        currentTime = time;
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
    <TransformWrapper>
      <TransformComponent>
        <div>
          {board.map((row, idx) => (
            // Row indexes are stable
            // eslint-disable-next-line react/no-array-index-key
            <GameRow row={row} key={idx} />
          ))}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}
