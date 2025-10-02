// React
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Components
import App from './App.tsx'
// Styles
import './index.css'
// Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
