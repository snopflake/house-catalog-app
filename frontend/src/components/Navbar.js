import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const baseLink = "px-2 py-1 rounded transition-colors duration-150";
  const activeLink = "border-b-2 border-white font-semibold";
  const hoverLink = "hover:bg-[#F8F9FA] hover:text-[#2C3E50]";

  // Semua menu
  const menu = (
    <>
      <NavLink
        to="/designs"
        className={({ isActive }) =>
          `${baseLink} ${hoverLink} ${isActive ? activeLink : ""}`
        }
        onClick={() => setOpen(false)}
      >
        Designs
      </NavLink>
      {(role === 'designer' || role === 'admin') && (
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `${baseLink} ${hoverLink} ${isActive ? activeLink : ""}`
          }
          onClick={() => setOpen(false)}
        >
          Upload
        </NavLink>
      )}
      <NavLink
        to="/messages"
        className={({ isActive }) =>
          `${baseLink} ${hoverLink} ${isActive ? activeLink : ""}`
        }
        onClick={() => setOpen(false)}
      >
        Messages
      </NavLink>
      {role === 'admin' && (
        <NavLink
          to="/admin/messages"
          className={({ isActive }) =>
            `${baseLink} ${hoverLink} ${isActive ? activeLink : ""}`
          }
          onClick={() => setOpen(false)}
        >
          Manage Messages
        </NavLink>
      )}
      {role === 'admin' && (
        <NavLink
          to="/admin/designs"
          className={({ isActive }) =>
            `${baseLink} ${hoverLink} ${isActive ? activeLink : ""}`
          }
          onClick={() => setOpen(false)}
        >
          Manage Designs
        </NavLink>
      )}
      {role === 'admin' && (
        <NavLink
          to="/admin/access"
          className={({ isActive }) =>
            `${baseLink} ${hoverLink} ${isActive ? activeLink : ""}`
          }
        >
          Manage Access
        </NavLink>
      )}
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${baseLink} ${hoverLink} ${isActive ? activeLink : ""}`
        }
        onClick={() => setOpen(false)}
      >
        Profile
      </NavLink>
      <button
        onClick={() => {
          localStorage.clear();
          navigate('/');
          window.location.reload();
        }}
        className="text-white px-3 py-1 rounded ml-2 hover:bg-white hover:text-[#2C3E50] transition-colors duration-150"
      >
        Logout
      </button>
    </>
  );

  return (
    <>
      <nav className="bg-[#2C3E50] text-white px-4 py-3 flex justify-between items-center relative">
        {/* Kiri: Logo/Home */}
        <div>
          <NavLink to="/" className="font-bold text-xl ml-2">Dream House Design</NavLink>
        </div>
        {/* Hamburger button (mobile) */}
        <button
          className="md:hidden flex flex-col justify-center items-center"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block h-1 w-6 bg-white mb-1 rounded transition-all ${open ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block h-1 w-6 bg-white mb-1 rounded transition-all ${open ? "opacity-0" : ""}`}></span>
          <span className={`block h-1 w-6 bg-white rounded transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
        {/* Menu kanan */}
        <div className="hidden md:flex items-center space-x-4">
          {menu}
        </div>
      </nav>
      {/* Mobile menu - now placed below the nav */}
      {open && (
        <div className="w-full bg-[#2C3E50] flex flex-col items-start px-4 py-2 space-y-2 md:hidden z-50 shadow-lg">
          {menu}
        </div>
      )}
    </>
  );
}

export default Navbar;