import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "./styles/animations.css";
import { ResponsiveContextProvider } from './contexts/ResponsiveContext.tsx'
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <ResponsiveContextProvider>
  <Router>
    <App />
  </Router>
  </ResponsiveContextProvider>
)
