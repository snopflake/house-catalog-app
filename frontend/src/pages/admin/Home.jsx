const AdminHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Designs</h2>
            <p className="text-blue-600">Manage all design submissions</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Users</h2>
            <p className="text-green-600">View and manage user accounts</p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-800 mb-2">Settings</h2>
            <p className="text-purple-600">Configure system settings</p>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex space-x-4">
            <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-opacity-90 transition">
              View Designs
            </button>
            <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-opacity-90 transition">
              Manage Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;