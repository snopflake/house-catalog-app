import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function DesignPage() {
  const [designs, setDesigns] = useState([]);
  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchDesigns = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${backendURL}/api/designs`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      setDesigns(res.data);
    };
    fetchDesigns();
  }, [backendURL]);

  return (
    <div>
      <Navbar />
      <h2>Designs Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        {designs.map((design) => (
          <div key={design.id} style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8, width: 320 }}>
            <img
              src={`${backendURL}/uploads/${design.file_path}`}
              alt={design.design_name}
              style={{ width: '100%', height: 200, objectFit: 'cover', marginBottom: 8 }}
            />
            <h3>{design.design_name}</h3>
            <p><b>Country:</b> {design.design_country}</p>
            <p><b>Specialty:</b> {design.design_specialty}</p>
            <p><b>Created by:</b> {design.created_by}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DesignPage;