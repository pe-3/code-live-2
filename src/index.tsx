import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './App';
import ip from './ip.json'

const socket = new WebSocket(`ws://${ip.ip}:8080/socket`);
export { socket };
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

