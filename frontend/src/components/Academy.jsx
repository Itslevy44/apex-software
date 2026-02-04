import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Clock,
  Users,
  Star,
  ChevronRight,
  Award,
  PlayCircle,
  CheckCircle,
  TrendingUp,
  Zap,
  Shield,
  Code,
  Smartphone,
  Database,
  Sparkles,
  GraduationCap,
  Target,
  BarChart,
  LogOut,
  User,
  ShoppingCart,
  Bell,
  Trophy
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create axios instance with base URL and interceptors
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('apex_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const Academy = ({ enrollInCourse }) => {
  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  // Check authentication status
  const isAuthenticated = () => {
    return localStorage.getItem('apex_token') !== null;
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (!isAuthenticated()) return;

    try {
      const response = await api.get('/user/profile');
      setUser(response.data.data || response.data.user || response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  // Fetch user's enrolled courses
  const fetchUserCourses = async () => {
    if (!isAuthenticated()) return;

    try {
      const response = await api.get('/my-courses');
      setUserCourses(response.data.data || response.data.courses || response.data);
    } catch (error) {
      console.error('Error fetching user courses:', error);
    }
  };

  // Fetch cart items
  const fetchCart = async () => {
    if (!isAuthenticated()) return;

    try {
      const response = await api.get('/cart');
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!isAuthenticated()) return;

    try {
      const response = await api.get('/user/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Mark notifications as read
  const markNotificationsAsRead = async () => {
    if (!isAuthenticated()) return;

    try {
      await api.post('/user/notifications/read');
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  // Fetch all courses from backend
  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle course enrollment
  const handleEnrollCourse = async (course) => {
    if (!isAuthenticated()) {
      // Redirect to login or show login modal
      navigate('/login');
      return;
    }

    try {
      const response = await api.post(`/courses/${course.id}/enroll`);
      if (response.data.success) {
        enrollInCourse(course);
        fetchUserCourses(); // Refresh user's courses
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert(error.response?.data?.message || 'Failed to enroll in course');
    }
  };

  // Add to cart
  const addToCart = async (course) => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    try {
      const response = await api.post(`/cart/add/${course.id}`);
      if (response.data.success) {
        fetchCart();
        alert('Course added to cart!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('apex_token');
      setUser(null);
      setUserCourses([]);
      setCartItems([]);
      setNotifications([]);
      navigate('/');
    }
  };

  // Check exam eligibility
  const checkExamEligibility = async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}/exam/eligibility`);
      return response.data;
    } catch (error) {
      console.error('Error checking exam eligibility:', error);
      return { eligible: false, message: 'Unable to check eligibility' };
    }
  };

  // Download certificate
  const downloadCertificate = async (certificateNumber) => {
    try {
      const response = await api.get(`/certificates/${certificateNumber}/download`, {
        responseType: 'blob'
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${certificateNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Failed to download certificate');
    }
  };

  // Initialize all data
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      await Promise.all([
        fetchCourses(),
        isAuthenticated() && fetchUserProfile(),
        isAuthenticated() && fetchUserCourses(),
        isAuthenticated() && fetchCart(),
        isAuthenticated() && fetchNotifications()
      ]);
      setLoading(false);
    };

    initData();
  }, []);

  const categories = ['All', 'Web Development', 'Mobile Development', 'Data Science', 'Security', 'Design', 'DevOps'];

  const categoryIcons = {
    'Web Development': <Code className="text-emerald-600" size={20} />,
    'Mobile Development': <Smartphone className="text-cyan-600" size={20} />,
    'Data Science': <Database className="text-blue-600" size={20} />,
    'Security': <Shield className="text-amber-600" size={20} />,
    'Design': <Award className="text-purple-600" size={20} />,
    'DevOps': <Zap className="text-orange-600" size={20} />,
  };

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  // User Stats
  const userStats = [
    { number: `${userCourses.length}`, label: 'My Courses', color: 'text-emerald-600', icon: <BookOpen className="text-emerald-500" size={20} /> },
    { number: `${cartItems.length}`, label: 'Cart Items', color: 'text-blue-600', icon: <ShoppingCart className="text-blue-500" size={20} /> },
    { number: `${notifications.filter(n => !n.read_at).length}`, label: 'Notifications', color: 'text-amber-600', icon: <Bell className="text-amber-500" size={20} /> },
    { number: '3', label: 'Certificates', color: 'text-purple-600', icon: <Trophy className="text-purple-500" size={20} /> }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading academy data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50">
      {/* User Header Section */}
      {isAuthenticated() && user && (
        <section className="pt-4 px-4">
          <div className="container mx-auto">
            <div className="bg-white border border-emerald-200 rounded-2xl p-6 mb-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white text-2xl font-bold">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    {notifications.filter(n => !n.read_at).length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                        {notifications.filter(n => !n.read_at).length}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Welcome back, {user.name}!</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">Learning Score: 85%</span>
                    </div>
                  </div>
                </div>

                {/* User Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {userStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {stat.icon}
                        <div className={`text-xl font-bold ${stat.color}`}>{stat.number}</div>
                      </div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={markNotificationsAsRead}
                    className="relative p-2 rounded-lg hover:bg-emerald-50 transition-colors"
                    title="Notifications"
                  >
                    <Bell size={20} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-2 px-4 py-2 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    <User size={18} />
                    <span className="font-medium">Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="pt-4 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-full border border-emerald-200 mb-6 shadow-sm">
              <GraduationCap className="text-emerald-600" size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gray-800">Apex</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500">
                Academy
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Master in-demand tech skills with industry-recognized courses. Learn from experts and build real-world projects that get you hired.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 shadow-md">
                <Sparkles size={20} />
                Industry-Recognized Certificates
              </div>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-emerald-200 text-gray-700 rounded-xl font-bold hover:border-emerald-500 hover:shadow-md transition-all shadow-sm">
                <Target size={20} className="text-emerald-600" />
                Job-Ready Skills
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { number: `${courses.length}+`, label: 'Courses', color: 'text-emerald-600', icon: <BookOpen className="text-emerald-500" size={20} /> },
              { number: '1,500+', label: 'Students', color: 'text-cyan-600', icon: <Users className="text-cyan-500" size={20} /> },
              { number: '4.8', label: 'Avg Rating', color: 'text-blue-600', icon: <Star className="text-blue-500" size={20} /> },
              { number: '98%', label: 'Completion Rate', color: 'text-amber-600', icon: <BarChart className="text-amber-500" size={20} /> }
            ].map((stat, index) => (
              <div key={index} className="bg-white border border-emerald-200 rounded-2xl p-4 text-center hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {stat.icon}
                  <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.number}</div>
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500">Category</span>
            </h2>
            <p className="text-gray-600">
              Find the perfect course for your career goals
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${selectedCategory === category
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-200'
                  : 'bg-white border border-emerald-200 text-gray-700 hover:border-emerald-500 hover:shadow-md'
                  }`}
              >
                {categoryIcons[category] && <span>{categoryIcons[category]}</span>}
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isEnrolled = userCourses.some(uc => uc.id === course.id);

              return (
                <div
                  key={course.id}
                  className="bg-white border border-emerald-200 rounded-2xl hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300 shadow-sm group overflow-hidden"
                >
                  {/* Course Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg border ${course.level === 'Beginner' ? 'bg-emerald-50 border-emerald-100' :
                          course.level === 'Intermediate' ? 'bg-amber-50 border-amber-100' :
                            'bg-red-50 border-red-100'
                          }`}>
                          {categoryIcons[course.category] || <BookOpen className="text-emerald-600" size={20} />}
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${course.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                          course.level === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                          {course.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-amber-500 fill-amber-500" />
                        <span className="text-gray-800 font-bold">{course.rating}</span>
                      </div>
                    </div>

                    {/* Course Title & Description */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Course Features */}
                    <div className="space-y-2 mb-6">
                      {course.features?.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-emerald-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Course Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{course.students} students</span>
                      </div>
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-emerald-600">
                          KES {course.price?.toLocaleString() || '0'}
                        </div>
                        <div className="text-xs text-gray-500">One-time payment</div>
                      </div>

                      {isEnrolled ? (
                        <button
                          onClick={() => navigate(`/courses/${course.id}`)}
                          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-100 text-emerald-700 font-bold rounded-lg hover:bg-emerald-200 transition-all"
                        >
                          <PlayCircle size={18} />
                          Continue Learning
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => addToCart(course)}
                            className="px-4 py-2.5 border border-emerald-200 text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition-all"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => handleEnrollCourse(course)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-200 transition-all group/btn"
                          >
                            Enroll Now
                            <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="inline-flex p-4 bg-white/20 rounded-full border border-white/30 mb-6">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Career?
              </h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of students who have launched successful tech careers with our courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/courses')}
                  className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-white/30 transition-all duration-300"
                >
                  <PlayCircle size={20} />
                  View All Courses
                </button>
                {!isAuthenticated() && (
                  <button
                    onClick={() => navigate('/register')}
                    className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all"
                  >
                    <GraduationCap size={20} />
                    Start Learning Free
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-emerald-100 text-sm font-medium">
            • Lifetime Access • Certificate of Completion • 30-Day Money-Back Guarantee •
          </p>
        </div>
      </div>
    </div>
  );
};

export default Academy;