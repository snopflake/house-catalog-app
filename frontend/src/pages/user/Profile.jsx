import { useState } from 'react';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: 'User Name',
    email: 'user@example.com',
    bio: 'Design enthusiast and collector',
    preferences: {
      theme: 'light',
      notifications: true
    }
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handlePreferenceChange = (e) => {
    setProfile({
      ...profile,
      preferences: {
        ...profile.preferences,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>
        
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
              rows="3"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Preferences</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Theme</label>
              <select
                name="theme"
                value={profile.preferences.theme}
                onChange={handlePreferenceChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="notifications"
                id="notifications"
                checked={profile.preferences.notifications}
                onChange={handlePreferenceChange}
                className="mr-2"
              />
              <label htmlFor="notifications" className="text-gray-700">
                Receive email notifications
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-opacity-90 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;