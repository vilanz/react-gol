import { GameBoard } from './board';
import { useBoard } from './use-board';

export function Game() {
  const { board, generation, resetBoard } = useBoard();
  return (
    <div className="board-container">
      <h2>Game of Life</h2>
      <GameBoard board={board} />
      <p>
        Generation:
        {' '}
        {generation}
      </p>
      <button type="button" onClick={resetBoard}>Reset</button>
    </div>
  );
}
