import { Route, Routes, Link } from 'react-router-dom'
import { ExchangeView } from './views/ExchangeView/ExchangeView'
import { ExchangeProvider } from './contexts/ExchangeContext/ExchangeProvider'
import ChartsView from './views/ChartsView/ChartsView'

export default function App() {
  return (
    <ExchangeProvider>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <nav className="mb-6 flex gap-4">
          <Link to="/" className="text-blue-400 hover:underline">Exchange</Link>
          <Link to="/charts" className="text-blue-400 hover:underline">Charts</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ExchangeView />} />
          <Route path="/charts" element={<ChartsView />} />
        </Routes>
      </div>
    </ExchangeProvider>
  )
}
