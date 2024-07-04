import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './stores/store.js';
import { persistStore } from 'redux-persist';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root') as  HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
