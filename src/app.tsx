import { useReducer } from "react";
import ReactDOM from "react-dom/client";
import { gameReducer, INITIAL_STATE } from "./reducer";
import { GameCanvas, GameTools, useGameLoop, GameInfo, GitHubLink } from "./ui";

function GameOfLife() {
  // poor man's Redux - TODO substitute by redux-toolkit later
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  useGameLoop(state, dispatch);

  return (
    <div className="game-container">
      <h1>Game of Life</h1>
      <GameCanvas state={state} dispatch={dispatch} />
      <GameTools state={state} dispatch={dispatch} />
      <GameInfo state={state} />
      <GitHubLink />
    </div>
  );
}

const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(<GameOfLife />);
