import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { BlogProvider } from './context/BlogContext'
import './styles/design-system.css'
import './styles/main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BlogProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BlogProvider>
  </React.StrictMode>,
)
