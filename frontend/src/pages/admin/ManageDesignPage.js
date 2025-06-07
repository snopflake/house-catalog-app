import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

function ManageDesignPage() {
  const [designs, setDesigns] = useState([]);
  const backendURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/home');
    }
  }, [role, navigate]);

  useEffect(() => {
    const fetchDesigns = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${backendURL}/api/designs/all`, {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      setDesigns(res.data);
    };
    fetchDesigns();
  }, [backendURL]);

  const handleVerify = async (id) => {
    const token = localStorage.getItem('token');
    await axios.patch(`${backendURL}/api/designs/${id}/verify`, {}, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    setDesigns(designs.map(d => d.id === id ? { ...d, verified: 1 } : d));
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`${backendURL}/api/designs/${id}`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    setDesigns(designs.filter(d => d.id !== id));
  };

  return (
    <div>
      <Navbar />
      <h2>Manage Designs (Admin Only)</h2>
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
            <p><b>Verified:</b> {design.verified ? 'Yes' : 'No'}</p>
            {design.verified === 0 && (
              <button onClick={() => handleVerify(design.id)} style={{ marginRight: 8 }}>Verify</button>
            )}
            <button onClick={() => handleDelete(design.id)} style={{ background: 'red', color: 'white' }}>Delete</button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ManageDesignPage;