
import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from "./App.jsx";
import { ProfileProvider } from './Components/ProfileContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>,
  );
  // <StrictMode>
  //   <BrowserRouter>