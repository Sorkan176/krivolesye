import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/app/App.jsx'
import {BrowserRouter} from "react-router-dom";
import {ShopProvider} from "./context/ShopProvider.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ShopProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ShopProvider>
    </AuthProvider>
  </StrictMode>,
)
