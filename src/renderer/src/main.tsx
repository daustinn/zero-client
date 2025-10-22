import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import StartWindow from './windows/start'
import ConnectionForm from './windows/start/connection-form/page'
import EnvironmentForm from './windows/start/environment-form/page'
import MainWindow from './windows/main'
import { TooltipProvider } from './ui/commons/tooltip'
import MainQueriesPage from './windows/main/queries/page'

createRoot(document.body!).render(
  <StrictMode>
    <TooltipProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<StartWindow />} />
          <Route path="/connection" element={<ConnectionForm />} />
          <Route path="/environment" element={<EnvironmentForm />} />

          <Route path="/main/:id" element={<MainWindow />} />
          <Route path="/main/queries" element={<MainQueriesPage />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </StrictMode>
)
