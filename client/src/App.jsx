import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { BuilderProvider } from './context/BuilderContext.jsx'
import BuilderPage from './pages/BuilderPage'
import PreviewPage from "./pages/PreviewPage";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <BuilderProvider>

        <Routes>
          <Route path="/" element={<BuilderPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </BuilderProvider>
    </BrowserRouter>
  )
}

export default App
