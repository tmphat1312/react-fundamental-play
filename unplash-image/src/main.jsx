import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppContextProvider } from './context.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <QueryClientProvider client={new QueryClient()}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AppContextProvider>
  </React.StrictMode>
)
