import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
  rootElement
);
