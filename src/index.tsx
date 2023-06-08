import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StoreProvider from "./context/StoreContext";
import ThemeProvider from './context/ThemeContext';
import './fontawesome';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StoreProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StoreProvider>
);
