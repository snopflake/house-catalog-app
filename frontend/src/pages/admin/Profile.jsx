const AdminProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <p className="p-2 bg-gray-100 rounded">Admin User</p>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <p className="p-2 bg-gray-100 rounded">admin@example.com</p>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Role</label>
                <p className="p-2 bg-gray-100 rounded">Administrator</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Password</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Current Password</label>
                <input type="password" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">New Password</label>
                <input type="password" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Confirm Password</label>
                <input type="password" className="w-full p-2 border rounded" />
              </div>
              <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-opacity-90 transition">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;