import { useReducer } from "react";
import ReactDOM from "react-dom/client";
import { gameReducer, INITIAL_STATE } from "./reducer";
import { GameCanvas, GameTools, useGameLoop } from "./ui";

function GameOfLife() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  useGameLoop(state, dispatch);

  return (
    <div className="game-container">
      <h2>Game of Life</h2>
      <GameCanvas state={state} dispatch={dispatch} />
      <GameTools state={state} dispatch={dispatch} />
    </div>
  );
}

const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(<GameOfLife />);
