import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import '@fontsource/poppins/latin-200.css'
import '@fontsource/poppins/latin-300.css'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-300-italic.css'
import '@fontsource/poppins/latin-400-italic.css'
import '@fontsource/italiana/latin-400.css'
import '@fontsource-variable/bodoni-moda/opsz.css'
import '@fontsource-variable/bodoni-moda/opsz-italic.css'
import './index.css'
import { registerServiceWorker } from './utils/registerSW'

// Register service worker for offline capability
registerServiceWorker()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
)
