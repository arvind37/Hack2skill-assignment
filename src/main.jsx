import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import ProductDashboard from './ProductDashboard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductDashboard/>
  </StrictMode>,
)
