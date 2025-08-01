import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';import 'bootstrap-icons/font/bootstrap-icons.css';


import { IpoProvider } from './context/IpoContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IpoProvider>
      <App />
    </IpoProvider>
  </React.StrictMode>
);
