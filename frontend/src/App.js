import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import GalleryPage from './pages/GalleryPage';
import LandingPage from './pages/LandingPage';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {!token ? (
          <>
            <Route path="/login" element={<LoginPage setToken={setToken} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="*" element={<Navigate to="/upload" />} />
          </>
        )}
      </Routes>
      {token && (
        <button onClick={() => {
          localStorage.removeItem('token');
          setToken('');
        }}>Logout</button>
      )}
    </Router>
  );
}

export default App;