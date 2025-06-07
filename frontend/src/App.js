import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UploadPage from './pages/UploadPage';
import DesignPage from './pages/DesignPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import Message from './pages/Message';
import ManageMessagePage from './pages/admin/ManageMessagePage';
import ManageDesignPage from './pages/admin/ManageDesignPage';
import ManageAccessPage from './pages/admin/ManageAccessPage';
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
            <Route path="/designs" element={<DesignPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/messages" element={<Message />} />
            <Route path="/admin/messages" element={<ManageMessagePage />} />
            <Route path="/admin/designs" element={<ManageDesignPage />} />
            <Route path="/admin/access" element={<ManageAccessPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/designs" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;