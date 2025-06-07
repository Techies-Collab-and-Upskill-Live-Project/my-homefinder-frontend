import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
{/*import './index.css'*/}
import App from './App.jsx'
import { ProfileProvider } from './Profile/Assets/ProfileContext.jsx'


createRoot(document.getElementById('root')).render(
  
    <ProfileProvider>
      <StrictMode>
        <App />
      </StrictMode>
      
    </ProfileProvider>
  
)
