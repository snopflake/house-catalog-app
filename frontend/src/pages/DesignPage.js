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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-3xl font-bold text-center mb-8">Designs Gallery</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {designs.map((design) => (
            <div 
              key={design.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={`${backendURL}/uploads/${design.file_path}`}
                alt={design.design_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-2">{design.design_name}</h3>
                <p className="text-gray-600 mb-1">{design.design_country}</p>
                <p className="text-gray-600 mb-3">{design.design_specialty}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">By:</span> {design.created_by}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DesignPage;