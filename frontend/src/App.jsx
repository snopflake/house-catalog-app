import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from './component/Navbar.jsx';
import Footer from './component/Footer.jsx';
import ProtectedRoute from './component/ProtectedRoute.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Unauthorized from './pages/Unauthorized.jsx';

// User Pages
import UserHome from './pages/user/Home.jsx';
import UserDesigns from './pages/user/Designs.jsx';
import UserProfile from './pages/user/Profile.jsx';

// Admin Pages
import AdminHome from './pages/admin/Home.jsx';
import AdminDesigns from './pages/admin/Designs.jsx';
import AdminUsers from './pages/admin/Users.jsx';
import AdminProfile from './pages/admin/Profile.jsx';

// Designer Pages
import DesignerHome from './pages/designer/Home.jsx';
import DesignerDesigns from './pages/designer/Designs.jsx';
import DesignerProfile from './pages/designer/Profile.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {user && <Navbar role={user.role} logout={logout} />}
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* User routes */}
            <Route path="/user" element={<ProtectedRoute allowedRoles={['user']}><UserHome /></ProtectedRoute>} />
            <Route path="/user/designs" element={<ProtectedRoute allowedRoles={['user']}><UserDesigns /></ProtectedRoute>} />
            <Route path="/user/profile" element={<ProtectedRoute allowedRoles={['user']}><UserProfile /></ProtectedRoute>} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminHome /></ProtectedRoute>} />
            <Route path="/admin/designs" element={<ProtectedRoute allowedRoles={['admin']}><AdminDesigns /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={['admin']}><AdminProfile /></ProtectedRoute>} />
            
            {/* Designer routes */}
            <Route path="/designer" element={<ProtectedRoute allowedRoles={['designer']}><DesignerHome /></ProtectedRoute>} />
            <Route path="/designer/designs" element={<ProtectedRoute allowedRoles={['designer']}><DesignerDesigns /></ProtectedRoute>} />
            <Route path="/designer/profile" element={<ProtectedRoute allowedRoles={['designer']}><DesignerProfile /></ProtectedRoute>} />
            
            {/* Default route */}
            <Route path="/" element={
              user ? (
                user.role === 'admin' ? <Navigate to="/admin" /> :
                user.role === 'designer' ? <Navigate to="/designer" /> :
                <Navigate to="/user" />
              ) : <Navigate to="/login" />
            } />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;