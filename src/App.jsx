// Archivo principal de la aplicación LegacySport
// Configura el enrutamiento con React Router y define las rutas principales
// Estructura: Header fijo arriba, contenido dinámico abajo

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Category from './pages/Category'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="page-enter container mx-auto px-4 py-8 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category/*" element={<Category />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
