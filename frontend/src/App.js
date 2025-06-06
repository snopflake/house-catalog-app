// filepath: /home/praktikum/house-catalog-app/frontend/src/App.js
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import GalleryPage from './pages/GalleryPage';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <Router>
      {!token ? (
        <Routes>
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <div>
          <button onClick={() => {
            localStorage.removeItem('token');
            setToken('');
          }}>Logout</button>
          <Routes>
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="*" element={<Navigate to="/upload" />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;