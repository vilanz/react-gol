import { GameState } from "../reducer";

export function GameInfo({ state }: { state: GameState }) {
  const { generation, userHasDrawn } = state;

  return (
    <>
      <h3>Generation: {generation}</h3>
      {!userHasDrawn ? (
        <>
          <small>Draw cells by clicking. (you can also hold)</small>
          <small>Run GoL with the "Start" button below.</small>
        </>
      ) : null}
    </>
  );
}
