import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendURL = process.env.REACT_APP_API_URL;

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/api/auth/register`, { email, nama, password });
      setError('');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Register failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h1>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nama</label>
            <input type="text" value={nama} onChange={e => setNama(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800" required />
          </div>
          <button type="submit"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-opacity-90 transition">
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;