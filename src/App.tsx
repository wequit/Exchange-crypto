import { Route, Routes, Link } from 'react-router-dom'
import { ExchangeView } from './views/ExchangeView/ExchangeView'
import { ExchangeProvider } from './contexts/ExchangeContext'
// import AboutView from './views/AboutView/AboutView'

export default function App() {
  return (
    <ExchangeProvider>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <nav className="mb-6 flex gap-4">
          <Link to="/" className="text-blue-400 hover:underline">Exchange</Link>
          <Link to="/about" className="text-blue-400 hover:underline">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ExchangeView />} />
          {/* <Route path="/about" element={<AboutView />} /> */}
        </Routes>
      </div>
    </ExchangeProvider>
  )
}
