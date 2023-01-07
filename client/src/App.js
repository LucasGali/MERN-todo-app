import { Route, Routes } from 'react-router-dom'
import { HomeLayout } from './components/Layouts/HomeLayout'
import { ProtectedLayout } from './components/Layouts/ProtectedLayout'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'

function App() {
  return (
    <Routes>
      <Route path='*' element={<HomeLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route path='/' element={<ProtectedLayout />}>
        <Route path='home' element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App
