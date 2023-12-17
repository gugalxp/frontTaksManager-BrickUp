import React from 'react';
import { createRoot } from 'react-dom/client'; // Importe createRoot de react-dom/client
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './index.css';

const root = createRoot(document.getElementById('root')); // Use createRoot aqui

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
