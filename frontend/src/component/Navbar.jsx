import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ role, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-xl font-bold mb-4 md:mb-0">Dream House Design</Link>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {role === 'admin' && (
            <>
              <Link to="/admin" className="hover:underline px-2 py-1">Admin Home</Link>
              <Link to="/admin/designs" className="hover:underline px-2 py-1">Manage Designs</Link>
              <Link to="/admin/users" className="hover:underline px-2 py-1">Manage Users</Link>
              <Link to="/admin/profile" className="hover:underline px-2 py-1">Profile</Link>
            </>
          )}
          
          {role === 'designer' && (
            <>
              <Link to="/designer" className="hover:underline px-2 py-1">Designer Home</Link>
              <Link to="/designer/designs" className="hover:underline px-2 py-1">My Designs</Link>
              <Link to="/designer/profile" className="hover:underline px-2 py-1">Profile</Link>
            </>
          )}
          
          {role === 'user' && (
            <>
              <Link to="/user" className="hover:underline px-2 py-1">Home</Link>
              <Link to="/user/designs" className="hover:underline px-2 py-1">Designs</Link>
              <Link to="/user/profile" className="hover:underline px-2 py-1">Profile</Link>
            </>
          )}
          
          <button 
            onClick={handleLogout} 
            className="hover:underline px-2 py-1 bg-red-600 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
