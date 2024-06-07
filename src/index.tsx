import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './store';
import { WebAppContextProvider } from './store/webAppContext';

import './assets/styles/main.sass';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <WebAppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WebAppContextProvider>
  </Provider>
);
