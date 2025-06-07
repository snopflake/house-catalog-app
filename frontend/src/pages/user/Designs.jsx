import { useState, useEffect } from 'react';
import axios from 'axios';

const UserDesigns = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/designs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDesigns(res.data);
      } catch (err) {
        setError('Failed to fetch designs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDesigns();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Design Gallery</h1>
        
        {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
        
        {designs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No designs available
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map(design => (
              <div key={design.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <img 
                  src={`${process.env.REACT_APP_API_URL}/uploads/${design.file_path}`} 
                  alt="Design" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-gray-50">
                  <button className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-opacity-90 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDesigns;