import ReactDOM from 'react-dom/client';
import { Game } from './game';
import './board.css';

const rootElement = document.getElementById('root')!;
ReactDOM
  .createRoot(rootElement)
  .render(<Game />);
