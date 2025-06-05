import { useState } from 'react';
import axios from 'axios';

function LoginPage({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const backendURL = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendURL}/api/auth/login`, { username, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
    } catch (err) {
      alert('Login failed: ' + err.response?.data?.msg || err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;

