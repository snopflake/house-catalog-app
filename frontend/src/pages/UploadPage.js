import { useState } from 'react';
import axios from 'axios';

function UploadPage() {
  const [file, setFile] = useState(null);

  const backendURL = process.env.REACT_APP_API_URL;

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${backendURL}/api/designs`, formData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Upload successful!');
    } catch (err) {
      alert('Upload failed: ' + err.response?.data?.msg || err.message);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <h2>Upload Design (PNG Only)</h2>
      <input type="file" accept="image/png" onChange={(e) => setFile(e.target.files[0])} required />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadPage;

