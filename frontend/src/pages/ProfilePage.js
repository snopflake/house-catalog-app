import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function ProfilePage() {
  const role = localStorage.getItem('role');
  const [profile, setProfile] = useState(null);

  // Ambil data profile user
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_API_URL}/api/auth/profile`, {
      headers: { Authorization: 'Bearer ' + token }
    }).then(res => setProfile(res.data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6" style={{ fontSize: '24px' }}>
            Profile Anda
          </h2>

          {profile && (
            <div className="space-y-4 text-center">
              <div className="border-b pb-2">
                <p className="text-gray-600">Nama</p>
                <p className="text-lg font-medium">{profile.nama}</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-gray-600">Email</p>
                <p className="text-lg font-medium">{profile.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Role</p>
                <p className="text-lg font-medium">{profile.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;