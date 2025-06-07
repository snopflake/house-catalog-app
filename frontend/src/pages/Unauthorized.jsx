import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Unauthorized Access</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact the administrator if you believe this is an error.
        </p>
        <Link 
          to="/" 
          className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-opacity-90 transition inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;