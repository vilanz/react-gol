import { IS_DESKTOP } from "../defaults";
import { GameState } from "../reducer";

export function GameInfo({ state }: { state: GameState }) {
  const { generation, userHasStarted, isRunning } = state;

  return (
    <div>
      <h3>Generation: {generation}</h3>
      <h1>{!isRunning ? "- Paused -" : null}</h1>
      {!userHasStarted ? (
        <div>
          <p>Draw cells by clicking {IS_DESKTOP ? "and holding" : null}.</p>
          <p>Run GoL with the &quot;Start&quot; button above.</p>
        </div>
      ) : null}
    </div>
  );
}
