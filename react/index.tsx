import * as React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <span>Hello, world!</span>
}

const slot = document.getElementById('game-slot');
ReactDOM.render(<App />, slot);
