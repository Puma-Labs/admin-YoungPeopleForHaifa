import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StoreProvider from "./context/StoreContext";
import ThemeProvider from './context/ThemeContext';
import './fontawesome';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Moment } from "moment";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StoreProvider>
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </StoreProvider>
);
