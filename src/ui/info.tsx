import { IS_DESKTOP } from "../defaults";
import { GameState } from "../reducer";

export function GameInfo({ state }: { state: GameState }) {
  const { generation, userHasStarted } = state;

  return (
    <div>
      <h3>Generation: {generation}</h3>
      {!userHasStarted ? (
        <div>
          <p>Draw cells by clicking {IS_DESKTOP ? "and holding" : null}.</p>
          <p>Run GoL with the "Start" button below.</p>
        </div>
      ) : null}
    </div>
  );
}
