import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser, setError } from '../redux/userSlice';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.user);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(setLoading());
    try {
      const response = await axios.post('http://localhost:3001/api/auth/signup', formData);
      dispatch(setUser(response.data));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Signup failed'));
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder – connect with real Google OAuth flow
    alert('Google Sign-In is coming soon!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white border border-gray-200">
        <div className="text-center mb-6">
          <img src="../src/assets/LogoGradient.png" alt="Logo" className="w-12 h-12 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">Start your journey with us</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full mb-6 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-3 h-3" />
          <span className="text-sm font-medium text-gray-700">Continue with Google</span>
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-400">or sign up with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white rounded-md text-sm transition ${
                loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
