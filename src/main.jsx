import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import { RoutesProvider } from '../wrapper/RoutesProvider.jsx'
import { Header } from '../src/components/Header/Header.jsx'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../wrapper/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ToastContainer />
      <Header />
      <RoutesProvider />
    </AuthProvider>
  </BrowserRouter>,
)
