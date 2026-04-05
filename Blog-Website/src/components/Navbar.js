import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">CodecTech Blog</Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 transition">Home</Link>
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 transition">Dashboard</Link>
              )}
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium">Logout</button>
            </>
          ) : (
            <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
