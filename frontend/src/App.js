import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import GalleryPage from './pages/GalleryPage';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  if (!token) {
    return <LoginPage setToken={setToken} />;
  }

  return (
    <div>
      <button onClick={() => {
        localStorage.removeItem('token');
        setToken('');
      }}>Logout</button>
      <UploadPage />
      <GalleryPage />
    </div>
  );
}

export default App;

