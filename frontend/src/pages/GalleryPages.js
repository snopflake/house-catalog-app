import { useEffect, useState } from 'react';
import axios from 'axios';

function GalleryPage() {
  const [designs, setDesigns] = useState([]);

  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchDesigns = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${backendURL}/api/designs`, {
        headers: {
          'Authorization': token
        }
      });
      setDesigns(res.data);
    };
    fetchDesigns();
  }, []);

  return (
    <div>
      <h2>Gallery</h2>
      {designs.map((design) => (
        <img 
          key={design.id} 
          src={`${backendURL}/uploads/${design.image}`} 
          alt="design" 
          width="300" 
        />
      ))}
    </div>
  );
}

export default GalleryPage;

