import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

function ManageMessagePage() {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState({});
  const backendURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/home');
    }
  }, [role, navigate]);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${backendURL}/api/messages/all`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setMessages(res.data);
    };
    fetchMessages();
  }, [backendURL]);

  const handleReply = async (id) => {
    const token = localStorage.getItem('token');
    await axios.patch(`${backendURL}/api/messages/${id}/reply`, { reply: reply[id] || '' }, {
      headers: { Authorization: 'Bearer ' + token }
    });
    setMessages(messages.map(m => m.id === id ? { ...m, reply: reply[id] } : m));
    setReply({ ...reply, [id]: '' });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`${backendURL}/api/messages/${id}`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-xl font-bold mb-4">Manage Messages</h2>
        <ul>
          {messages.map(msg => (
            <li key={msg.id} className="mb-4 border-b pb-2">
              <div><b>From:</b> {msg.sender_email}</div>
              <div><b>Pesan:</b> {msg.messages}</div>
              <div><b>Reply:</b> {msg.reply || '-'}</div>
              <div className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString()}</div>
              <div className="flex space-x-2 mt-2">
                <input
                  type="text"
                  value={reply[msg.id] || ''}
                  onChange={e => setReply({ ...reply, [msg.id]: e.target.value })}
                  placeholder="Tulis balasan..."
                  className="border p-1 rounded"
                />
                <button
                  onClick={() => handleReply(msg.id)}
                  className="bg-green-600 text-white px-2 rounded"
                >
                  Balas
                </button>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="bg-red-600 text-white px-2 rounded"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default ManageMessagePage;