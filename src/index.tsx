import * as React from 'react';
import { render } from 'react-dom';
import { getEmptyCellBoard, Board, updateCellBoard } from './game-logic';

const randomizedBoard = getEmptyCellBoard().map((row) => row.map(() => Math.round(Math.random())));

function App(): JSX.Element {
  const [board, setBoard] = React.useState<Board>(randomizedBoard);

  React.useEffect(() => {
    const refresh = setInterval(() => {
      setBoard((b) => updateCellBoard(b));
    }, 1000);
    return () => clearInterval(refresh);
  }, []);

  return (
    <div>
      {board.map((row, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div style={{ display: 'flex' }} key={idx}>
          {
            row.map((cell) => <div style={{ height: '50px', width: '50px', backgroundColor: cell ? 'orange' : 'black', transition: 'background-color 0.5s ease' }} />)
          }
        </div>
      ))}
    </div>
  );
}

const slot = document.createElement('div');
document.body.appendChild(slot);
render(<App />, slot);
