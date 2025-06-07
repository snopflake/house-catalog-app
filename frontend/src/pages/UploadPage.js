import { useState } from 'react';
import axios from 'axios';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [designName, setDesignName] = useState('');
  const [designCountry, setDesignCountry] = useState('');
  const [designSpecialty, setDesignSpecialty] = useState('');

  const backendURL = process.env.REACT_APP_API_URL;

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('design_name', designName);
    formData.append('design_country', designCountry);
    formData.append('design_specialty', designSpecialty);

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
    <form onSubmit={handleUpload}>
      <h2>Upload Design (PNG Only)</h2>
      <input type="text" placeholder="Design Name" value={designName} onChange={e => setDesignName(e.target.value)} required />
      <input type="text" placeholder="Design Country" value={designCountry} onChange={e => setDesignCountry(e.target.value)} required />
      <input type="text" placeholder="Design Specialty" value={designSpecialty} onChange={e => setDesignSpecialty(e.target.value)} required />
      <input type="file" accept="image/png" onChange={(e) => setFile(e.target.files[0])} required />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadPage;