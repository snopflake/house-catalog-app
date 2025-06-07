import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <div>
        <Link to="/home" className="font-bold text-xl mr-4">House Catalog</Link>
        <Link to="/designs" className="mr-4">Designs</Link>
        {(role === 'designer' || role === 'admin') && (
          <Link to="/upload" className="mr-4">Upload</Link>
        )}
        <Link to="/profile" className="mr-4">Profile</Link>
      </div>
      <button
        onClick={() => {
          localStorage.clear();
          navigate('/login');
        }}
        className="bg-red-500 px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;