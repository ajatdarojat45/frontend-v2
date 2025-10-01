import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { EditorPage } from './pages/EditorPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { store } from './store'
function App() {
  return (
    <ReduxProvider  store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  )
}

export default App
