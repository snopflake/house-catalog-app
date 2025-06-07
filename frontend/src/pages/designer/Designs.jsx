import { useState, useEffect } from 'react';
import axios from 'axios';

const DesignerDesigns = () => {
  const [designs, setDesigns] = useState([]);
  const [file, setFile] = useState(null);
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

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', file);
      
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/designs`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setDesigns([...designs, { id: res.data.id, file_path: res.data.filename }]);
      setFile(null);
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Upload failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/designs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDesigns(designs.filter(design => design.id !== id));
    } catch (err) {
      setError('Failed to delete design');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Designs</h1>
        
        {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
        
        <div className="mb-8 p-6 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload New Design</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">PNG File</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                accept="image/png"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-opacity-90 transition"
            >
              Upload Design
            </button>
          </form>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map(design => (
            <div key={design.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <img 
                src={`${process.env.REACT_APP_API_URL}/uploads/${design.file_path}`} 
                alt="Design" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex justify-between bg-gray-50">
                <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition">
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(design.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignerDesigns;