import { GameState } from "../reducer";

export function GameInfo({ state }: { state: GameState }) {
  const { generation, userHasDrawn } = state;

  return (
    <div>
      <h3>Generation: {generation}</h3>
      {!userHasDrawn ? (
        <div>
          <p>Draw cells by clicking. (you can also hold)</p>
          <p>Run GoL with the "Start" button below.</p>
        </div>
      ) : null}
    </div>
  );
}
