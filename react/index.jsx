import * as React from 'react';
import ReactDOM from 'react-dom';
import { getEmptyCellBoard } from '../game-of-life';

function App() {
  const [cells, setCells] = React.useState(getEmptyCellBoard())
  return <span>Hello, world!</span>
}

const slot = document.getElementById('game-slot');
ReactDOM.render(<App />, slot);
