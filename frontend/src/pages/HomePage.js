import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [designs, setDesigns] = useState([]);
  const [profile, setProfile] = useState(null);

  // Ambil data designs dari backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_API_URL}/api/designs`, {
      headers: { Authorization: 'Bearer ' + token }
    }).then(res => setDesigns(res.data));
  }, []);

  // Ambil data profile user
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_API_URL}/api/auth/profile`, {
      headers: { Authorization: 'Bearer ' + token }
    }).then(res => setProfile(res.data));
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={() => {
        localStorage.clear();
        navigate('/login');
      }}>Logout</button>
      {(role === 'designer' || role === 'admin') && (
        <button onClick={() => navigate('/upload')}>Upload</button>
      )}
      <button onClick={() => navigate('/gallery')}>Design</button>
      <button onClick={() => navigate('/profile')}>Profile</button>

      <h3>Daftar Designs</h3>
      <ul>
        {designs.map(design => (
          <li key={design.id}>
            <a href={`//${window.location.hostname}:5001/files/${design.file_path}`} target="_blank" rel="noopener noreferrer">
              {design.file_path}
            </a>
          </li>
        ))}
      </ul>

      {profile && (
        <div>
          <h3>Profil Anda</h3>
          <p>Nama: {profile.nama}</p>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;