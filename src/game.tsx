import { GameBoard } from './board';
import { MAX_SPEED, MIN_SPEED, useBoard } from './use-board';

export function Game() {
  const {
    board, generation, currentSpeed, resetBoard, setSpeed,
  } = useBoard();

  return (
    <div className="game-container">
      <h2>Game of Life</h2>
      <p>
        Generation:
        {' '}
        {generation}
      </p>
      <GameBoard board={board} />
      <div className="game-tools">
        Speed
        <input
          type="range"
          min={MIN_SPEED}
          max={MAX_SPEED}
          value={currentSpeed}
          onChange={(e) => setSpeed(+e.target.value)}
        />
        {currentSpeed}
        <button type="button" onClick={resetBoard}>Reset</button>
      </div>
    </div>
  );
}
