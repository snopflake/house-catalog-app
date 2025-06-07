import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [designName, setDesignName] = useState('');
  const [designCountry, setDesignCountry] = useState('');
  const [designSpecialty, setDesignSpecialty] = useState('');
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (role === 'user') {
      navigate('/home');
    }
  }, [role, navigate]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview('');
    }
  }, [file]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('design_name', designName);
    formData.append('design_country', designCountry);
    formData.append('design_specialty', designSpecialty);

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
      // Reset form after successful upload
      setDesignName('');
      setDesignCountry('');
      setDesignSpecialty('');
      setFile(null);
      setPreview('');
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Upload Design</h2>
            <p className="text-sm text-gray-500 text-center mb-6">(PNG format only)</p>
            
            <form onSubmit={handleUpload} className="space-y-4">
              {preview && (
                <div className="flex justify-center">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="h-40 object-contain border rounded-lg"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Design Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  placeholder="Enter design name"
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  placeholder="Enter country"
                  value={designCountry}
                  onChange={(e) => setDesignCountry(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  placeholder="Enter specialty"
                  value={designSpecialty}
                  onChange={(e) => setDesignSpecialty(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Design Image</label>
                <input
                  type="file"
                  accept="image/png"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-[#2C3E50] hover:file:[#2C3E50]"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#2C3E50] text-white py-2 px-4 rounded-md hover:bg-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:ring-offset-2 transition-colors"
              >
                Upload Design
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UploadPage;