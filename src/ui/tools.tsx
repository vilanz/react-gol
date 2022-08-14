import { MAX_SPEED, MIN_SPEED } from "../defaults";
import { GameDispatch, GameState } from "../reducer";

export function GameTools({
  state,
  dispatch,
}: {
  state: GameState;
  dispatch: GameDispatch;
}) {
  const speedPercentage = Math.round((state.currentSpeed / MAX_SPEED) * 100);

  return (
    <div className="game-tools">
      Speed
      <input
        type="range"
        min={MIN_SPEED}
        max={MAX_SPEED}
        value={state.currentSpeed}
        onChange={(e) =>
          dispatch({
            type: "SET_SPEED",
            payload: +e.target.value,
          })
        }
      />
      <span className="game-speed">{speedPercentage}</span>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: "RESET_BOARD" });
        }}
      >
        Reset
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch({
            type: "TOGGLE_RUNNING",
          });
        }}
      >
        {state.isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
}
