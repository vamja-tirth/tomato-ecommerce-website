import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextprovider from './context/StoreContext.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextprovider>
      <ToastContainer/>
      <App />
    </StoreContextprovider>
  </BrowserRouter>

)
