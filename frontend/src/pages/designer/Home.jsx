const DesignerHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Designer Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Designs</h2>
            <p className="text-gray-600 mb-4">
              Upload and manage your design portfolio. Showcase your work to potential clients.
            </p>
            <a 
              href="/designer/designs" 
              className="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
            >
              View My Designs
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile</h2>
            <p className="text-gray-600 mb-4">
              Update your profile information and manage your account settings.
            </p>
            <a 
              href="/designer/profile" 
              className="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
            >
              Edit Profile
            </a>
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="text-gray-500">Total Designs</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="text-gray-500">Views</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="text-gray-500">Likes</p>
              <p className="text-2xl font-bold">56</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="text-gray-500">Comments</p>
              <p className="text-2xl font-bold">23</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerHome;