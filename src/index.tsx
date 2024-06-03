import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import App from './App';
import { store } from './store';
import { WebAppContextProvider } from './store/webAppContext';

import './assets/styles/main.sass';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <WebAppContextProvider>
      <App />
    </WebAppContextProvider>
  </Provider>
);
