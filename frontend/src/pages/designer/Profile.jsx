import { useState } from 'react';

const DesignerProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Designer User',
    email: 'designer@example.com',
    bio: 'Creative designer specializing in modern UI/UX',
    portfolio: 'https://portfolio.example.com'
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Designer Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
              disabled
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Portfolio URL</label>
            <input
              type="url"
              name="portfolio"
              value={profile.portfolio}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          
          <button
            type="submit"
            className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-opacity-90 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default DesignerProfile;