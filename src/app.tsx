import { useReducer } from "react";
import ReactDOM from "react-dom/client";
import { gameReducer, INITIAL_STATE } from "./reducer";
import { GameCanvas, GameTools } from "./ui";

function GameOfLife() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  return (
    <div className="game-container">
      <h2>Game of Life</h2>
      <p>Generation: {state.generation}</p>
      <GameCanvas state={state} dispatch={dispatch} />
      <GameTools state={state} dispatch={dispatch} />
    </div>
  );
}

const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(<GameOfLife />);
