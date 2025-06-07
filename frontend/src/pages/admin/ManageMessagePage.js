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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Kelola Pesan</h2>
              <p className="text-gray-600">Kelola pesan dan balasan dari pengguna</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {messages.length > 0 ? (
                messages.map(msg => (
                  <div key={msg.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{msg.sender_email}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(msg.created_at).toLocaleString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Hapus pesan"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-800 mb-3">{msg.messages}</p>
                      <div className={`p-3 rounded-lg ${msg.reply ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-200'}`}>
                        <p className="font-medium text-sm text-gray-700 mb-1">Balasan:</p>
                        <p className={msg.reply ? 'text-green-700' : 'text-gray-500'}>{msg.reply || 'Belum ada balasan'}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={reply[msg.id] || ''}
                        onChange={e => setReply({ ...reply, [msg.id]: e.target.value })}
                        placeholder="Tulis balasan..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent"
                      />
                      <button
                        onClick={() => handleReply(msg.id)}
                        className="bg-[#2C3E50] text-white px-4 py-2 rounded-lg hover:bg-[#1a2635] transition-colors"
                      >
                        Kirim Balasan
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  Tidak ada pesan yang perlu dikelola
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ManageMessagePage;