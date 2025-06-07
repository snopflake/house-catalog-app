import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

function ManageAccessPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/home');
    }
  }, [role, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${backendURL}/api/access/users`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setUsers(res.data);
      setLoading(false);
    };
    fetchUsers();
  }, [backendURL]);

  const handleRoleChange = async (id, newRole) => {
    const token = localStorage.getItem('token');
    await axios.patch(`${backendURL}/api/access/users/${id}/role`, { role: newRole }, {
      headers: { Authorization: 'Bearer ' + token }
    });
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow max-w-3xl mx-auto px-4 py-8 w-full">
        <h2 className="text-2xl font-bold mb-6">Manage User Access</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {users.map(user => (
              <div key={user.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{user.nama}</h3>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : user.role === 'designer' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                  
                  {user.role === 'user' ? (
                    <button
                      onClick={() => handleRoleChange(user.id, 'designer')}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                    >
                      Make Designer
                    </button>
                  ) : user.role === 'designer' ? (
                    <button
                      onClick={() => handleRoleChange(user.id, 'user')}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                    >
                      Make User
                    </button>
                  ) : (
                    <span className="text-xs text-gray-500">Admin (cannot change)</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ManageAccessPage;