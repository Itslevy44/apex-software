import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  X,
  Mail,
  Lock,
  User,
  CheckCircle,
  Shield,
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react';

const AuthModal = ({ close, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const endpoint = isLogin ? 'login' : 'register';

    if (!isLogin && formData.password !== formData.password_confirmation) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`http://127.0.0.1:8000/api/${endpoint}`, formData);
      localStorage.setItem('apex_token', data.token);
      localStorage.setItem('apex_user', JSON.stringify(data.user));
      setUser(data.user);
      setSuccess(isLogin ? 'Welcome back!' : 'Account created!');

      setTimeout(() => {
        close();
        if (data.user.role === 'admin' || data.user.is_admin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }, 1200);

    } catch (err) {
      const errorMsg = err.response?.data?.message ||
        err.response?.data?.error ||
        "Please check your details";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 w-full max-w-md rounded-2xl shadow-xl relative overflow-hidden">

        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full hover:bg-white hover:border-emerald-500 hover:scale-110 transition-all duration-200"
        >
          <X size={18} className="text-emerald-700" />
        </button>

        <div className="p-6">
          {/* Compact Header */}
          <div className="text-center mb-6">
            <div className="inline-flex p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full border border-emerald-200 mb-3">
              <Shield size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Welcome Back' : 'Join Apex'}
            </h2>
            <p className="text-emerald-700 text-sm mt-1">
              {isLogin ? 'Sign in to continue' : 'Create account in seconds'}
            </p>
          </div>

          {/* Messages */}
          {success && (
            <div className="mb-4 p-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>{success}</span>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg text-sm">
              <div className="flex items-center gap-2">
                <X size={16} />
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Compact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-emerald-200 rounded-lg text-gray-800 text-sm placeholder-emerald-600 outline-none focus:border-emerald-500 focus:shadow focus:shadow-emerald-100 transition-all"
                />
              </div>
            )}

            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-3 py-2.5 bg-white border border-emerald-200 rounded-lg text-gray-800 text-sm placeholder-emerald-600 outline-none focus:border-emerald-500 focus:shadow focus:shadow-emerald-100 transition-all"
              />
            </div>

            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength="6"
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-emerald-200 rounded-lg text-gray-800 text-sm placeholder-emerald-600 outline-none focus:border-emerald-500 focus:shadow focus:shadow-emerald-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-800"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <CheckCircle size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-emerald-200 rounded-lg text-gray-800 text-sm placeholder-emerald-600 outline-none focus:border-emerald-500 focus:shadow focus:shadow-emerald-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-800"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-2.5 rounded-lg font-bold hover:shadow-md hover:shadow-emerald-200 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  {isLogin ? 'Signing in...' : 'Creating...'}
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Compact Toggle */}
          <div className="mt-5 pt-4 border-t border-emerald-200">
            <p className="text-center text-gray-600 text-sm">
              {isLogin ? "New to Apex?" : "Have an account?"}{' '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccess('');
                }}
                className="text-emerald-600 font-bold hover:text-emerald-800 hover:underline"
              >
                {isLogin ? 'Create account' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;