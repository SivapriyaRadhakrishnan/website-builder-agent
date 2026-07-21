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
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </BuilderProvider>
    </BrowserRouter>
  )
}

export default App
