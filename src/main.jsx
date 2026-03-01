import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ShopContext } from './context/ShopContext.jsx'
import ShopContextProvider from './context/ShopContext.jsx'
import ThemeProvider from './context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
