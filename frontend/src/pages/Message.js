import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Message() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${backendURL}/api/messages`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setMessages(res.data);
    };
    fetchMessages();
  }, [backendURL]);

  const handleSend = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(`${backendURL}/api/messages`, { messages: input }, {
      headers: { Authorization: 'Bearer ' + token }
    });
    setInput('');
    // refresh messages
    const res = await axios.get(`${backendURL}/api/messages`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    setMessages(res.data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Message Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Pesan Anda</h2>
              
              {/* Message Form */}
              <form onSubmit={handleSend} className="mb-6">
                <div className="flex shadow-sm">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="flex-1 border border-gray-300 p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent"
                    placeholder="Tulis pesan..."
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-[#2C3E50] text-white px-4 py-2 rounded-r-lg hover:bg-[#1a2635] transition-colors"
                  >
                    Kirim
                  </button>
                </div>
              </form>
              
              {/* Messages List */}
              <div className="space-y-4">
                {messages.length > 0 ? (
                  messages.map(msg => (
                    <div key={msg.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="font-medium text-gray-800 mb-1">{msg.messages}</div>
                      <div className={`text-sm mb-2 ${msg.reply ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="font-medium">Balasan:</span> {msg.reply || 'Belum ada balasan'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(msg.created_at).toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Belum ada pesan
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Message;