import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input type="email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input type="password" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
