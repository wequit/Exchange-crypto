import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/globals.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
)
