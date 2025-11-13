import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaReact, FaNodeJs, FaJava, FaHtml5, FaCss3Alt, FaGitAlt
} from 'react-icons/fa';
import {
  SiMongodb, SiTailwindcss, SiTypescript, SiExpress, SiRedux, SiFirebase, SiPostgresql
} from 'react-icons/si';
import { GiFire } from 'react-icons/gi';

const techIcons = [
  FaReact, FaNodeJs, FaJava, SiMongodb, SiTailwindcss, SiTypescript,
  FaHtml5, FaCss3Alt, FaGitAlt, SiExpress, SiRedux, SiFirebase, SiPostgresql
];

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //   // Safely access the env-variable
  // const API_BASE = (import.meta.env?.VITE_API_BASE)
  //   ? import.meta.env.VITE_API_BASE
  //   : 'http://localhost:5000';

  // if (!import.meta.env?.VITE_API_BASE) {
  //   console.warn(' VITE_API_BASE not set — using fallback:', API_BASE);
  // }


   // Safely access the env-variable
  const API_BASE = (import.meta.env?.VITE_API_BASE)
    ? import.meta.env.VITE_API_BASE
    : 'http://localhost:5000';

  if (!import.meta.env?.VITE_API_BASE) {
    console.warn(' VITE_API_BASE not set — using fallback:', API_BASE);


  }


  const handleLogin = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Login attempt started`);

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: email.trim(),
        password: password.trim()
      };
      console.log(`[${timestamp}] Sending payload:`, payload);
      console.log('[FETCH] Sending login request to:', `${API_BASE}/admin/login`);

      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      console.log(`[${timestamp}] Response status:`, res.status);
      const data = await res.json();
      console.log(`[${timestamp}] Response data:`, data);

      if (!res.ok) {
        toast.error(data.message || 'Login failed');
        console.warn(`[${timestamp}] Login failed:`, data.message);
        return;
      }

      if (data.role !== 'admin') {
        toast.error('Access denied: Admins only');
        console.warn(`[${timestamp}] Role mismatch:`, data.role);
        return;
      }

      if (!data.accessToken) {
        toast.error('Missing token in response');
        console.error(`[${timestamp}] No accessToken returned`);
        return;
      }

      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify({ email: data.email, role: data.role }));

      // Debug logs to confirm localStorage
      console.log(" Stored user:", localStorage.getItem('user'));
      console.log(" Stored token:", localStorage.getItem('token'));

      toast.success(' Admin login successful');
      console.log(`[${timestamp}]  Redirecting to /admin/dashboard`);

      // Use navigate or fallback to window.location.href
      navigate('/admin/dashboard');
      // window.location.href = '/admin/dashboard'; // Uncomment if navigate fails
    } catch (err) {
      toast.error('Server error');
      console.error(`[${new Date().toISOString()}] Login error:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f071a] via-[#1a102e] to-[#2a1a4f] text-gray-200 relative overflow-hidden">
      {/* Floating Welcome Message */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-purple-400 animate-float z-10 flex items-center gap-2">
        <GiFire className="text-yellow-400 text-4xl animate-pulse drop-shadow-[0_0_6px_#facc15]" />
        Welcome Admin
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {techIcons.map((Icon, index) => (
          <div
            key={index}
            className="absolute animate-[floatRandom_6s_ease-in-out_infinite]"
            style={{
              top: `${Math.random() * 90 + 5}%`,
              left: `${Math.random() * 90 + 5}%`,
              animationDelay: `${index * 0.5}s`,
            }}
          >
            <Icon className="text-4xl text-purple-400 drop-shadow-[0_0_6px_#a855f7] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_#a855f7] hover:animate-pulse" />
          </div>
        ))}
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="relative bg-[#ffffff0d] backdrop-blur-md border border-purple-500/30 shadow-[0_0_40px_#a855f7] rounded-xl p-8 w-full max-w-sm animate-fadeIn transition-all duration-500 z-10"
        aria-label="Admin Login Form"
      >
        <h2 className="text-2xl font-bold mb-6 text-purple-400 text-center drop-shadow-[0_0_6px_#a855f7]">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-[#1f1b2e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-inner"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-[#1f1b2e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-inner"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
          }`}
        >
          {loading ? 'Logging in...' : ' Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;






