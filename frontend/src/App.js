import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UploadPage from './pages/UploadPage';
import DesignPage from './pages/DesignPage';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
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
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </>
  ) : (
  <>
    <Route path="/home" element={<HomePage />} />
    <Route path="/upload" element={<UploadPage />} />
    <Route path="/designs" element={<DesignPage />} />
    <Route path="*" element={<Navigate to="/home" />} />
  </>
)}
      </Routes>
    </Router>
  );
}

export default App;
