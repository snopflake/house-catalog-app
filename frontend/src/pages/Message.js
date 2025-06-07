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
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-8">
        <h2 className="text-xl font-bold mb-4">Pesan Anda</h2>
        <form onSubmit={handleSend} className="mb-4 flex">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 border p-2 rounded-l"
            placeholder="Tulis pesan..."
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 rounded-r">Kirim</button>
        </form>
        <ul>
          {messages.map(msg => (
            <li key={msg.id} className="mb-3 border-b pb-2">
              <div><b>Pesan:</b> {msg.messages}</div>
              <div className="text-sm text-gray-600">Dibalas: {msg.reply || '-'}</div>
              <div className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Message;