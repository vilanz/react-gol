import React from 'react';
import ReactDOM from 'react-dom/client';
import { Game } from './game';
import './board.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
);
