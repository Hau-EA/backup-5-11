import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StateProvider } from './store';
import { ToastContainer } from 'react-toastify';
import GlobalStyle from './utils/globalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StateProvider>
      <GlobalStyle />
      <ToastContainer />
      <App />
    </StateProvider>
  </React.StrictMode>
);
