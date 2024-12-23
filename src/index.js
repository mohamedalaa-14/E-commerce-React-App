import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./css/components/loading.css"
import "./css/components/button.css"
import "./css/components/alerts.css"
import "./css/components/google.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './pages/Auth/AuthOperations/Auth.css'
import "./custom.css"
import 'react-loading-skeleton/dist/skeleton.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';
import CartChangerContext from './Context/CartChangerContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowContext>
    <MenuContext>
      <CartChangerContext>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </CartChangerContext>
    </MenuContext>
    </WindowContext>
  </React.StrictMode>
);


