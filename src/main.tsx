import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import { AuthSessionProvider } from '@/context/provider'

import App from './App.tsx'
import { ThemeProvider } from './context/provider/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthSessionProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthSessionProvider>
    </BrowserRouter>
  </StrictMode>
)
