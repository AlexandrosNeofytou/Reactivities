import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/layout/index.css'
import App from './app/layout/App'
import { store, StoreContext } from './app/stores/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
    
  </React.StrictMode>,
)
