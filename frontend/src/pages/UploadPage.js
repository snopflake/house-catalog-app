import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [designName, setDesignName] = useState('');
  const [designCountry, setDesignCountry] = useState('');
  const [designSpecialty, setDesignSpecialty] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

    useEffect(() => {
    if (role === 'user') {
      navigate('/home'); // atau ke halaman lain sesuai kebutuhan
    }
  }, [role, navigate]);

  const backendURL = process.env.REACT_APP_API_URL;

const handleUpload = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('image', file);
  formData.append('design_name', designName);
  formData.append('design_country', designCountry);
  formData.append('design_specialty', designSpecialty);

  // Ambil created_by dari localStorage (misal: email)
  const user = JSON.parse(localStorage.getItem('user'));
  formData.append('created_by', user?.email || '');

  try {
    const token = localStorage.getItem('token');
    await axios.post(`${backendURL}/api/designs`, formData, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'
      }
    });
    alert('Upload successful!');
  } catch (err) {
    alert('Upload failed: ' + (err.response?.data?.msg || err.message));
  }
};

  return (
    <div>
      <Navbar />
    <form onSubmit={handleUpload}>
      <h2>Upload Design (PNG Only)</h2>
      <input type="text" placeholder="Design Name" value={designName} onChange={e => setDesignName(e.target.value)} required />
      <input type="text" placeholder="Design Country" value={designCountry} onChange={e => setDesignCountry(e.target.value)} required />
      <input type="text" placeholder="Design Specialty" value={designSpecialty} onChange={e => setDesignSpecialty(e.target.value)} required />
      <input type="file" accept="image/png" onChange={(e) => setFile(e.target.files[0])} required />
      <button type="submit">Upload</button>
    </form>
    <Footer />
    </div>
  );
}

export default UploadPage;