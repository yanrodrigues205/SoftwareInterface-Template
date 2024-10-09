import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Cria a "root" com React 18

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
