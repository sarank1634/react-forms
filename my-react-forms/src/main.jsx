import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter, Routes,Route } from 'react-router-dom' 
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { store } from './app/store.jsx';
import { Provider} from 'react-redux';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element= { <App />} />
      </Routes>
     
    </AuthProvider>
    </BrowserRouter>
    </Provider>
  </StrictMode>
)