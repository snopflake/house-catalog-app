const UserHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Design Platform</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Browse Designs</h2>
            <p className="text-blue-600">Explore our collection of creative designs</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Save Favorites</h2>
            <p className="text-green-600">Bookmark designs you love</p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-800 mb-2">Contact Designers</h2>
            <p className="text-purple-600">Connect with talented designers</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Featured Designs</h2>
          <p className="text-gray-600 mb-4">
            Check out some of our most popular designs this week
          </p>
          <a 
            href="/user/designs" 
            className="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
          >
            View All Designs
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserHome;