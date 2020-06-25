import * as React from 'react';
import { render } from 'react-dom';
import { getEmptyCellBoard, Board } from './game-logic';

function App(): JSX.Element {
  const [board] = React.useState<Board>(getEmptyCellBoard());
  return (
    <div>
      {board.map((row, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div style={{ display: 'flex' }} key={idx}>
          {
            row.map((cell) => <div style={{ height: '30px', width: '30px', backgroundColor: cell ? 'blue' : 'green' }} />)
          }
        </div>
      ))}
    </div>
  );
}

const slot = document.getElementById('game-slot');
render(<App />, slot);
