import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  User, 
  Mail, 
  GraduationCap, 
  ShoppingBag, 
  CheckCircle, 
  Clock,
  Package,
  ChevronRight,
  Award,
  Sparkles,
  Edit,
  Save,
  Trash2,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Star,
  Trophy,
  Target,
  BarChart,
  Download,
  Share2,
  Bell,
  Settings,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import axios from 'axios';

const Profile = ({ user, close, fetchUserProfile }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || '',
    avatar: user?.avatar || null,
  });

  // Fetch user data
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('apex_token');
      
      // Fetch orders
      const ordersResponse = await axios.get('http://127.0.0.1:8000/api/user/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setOrders(ordersResponse.data.orders || []);

      // Fetch enrollments
      const enrollmentsResponse = await axios.get('http://127.0.0.1:8000/api/user/enrollments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setEnrollments(enrollmentsResponse.data.enrollments || []);

      // Fetch achievements
      const achievementsResponse = await axios.get('http://127.0.0.1:8000/api/user/achievements', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setAchievements(achievementsResponse.data.achievements || []);

    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // Fallback to mock data if API not ready
      setOrders([
        { id: 'ORD-001', date: '2024-01-15', status: 'Delivered', total: 4500, items: 3 },
        { id: 'ORD-002', date: '2024-01-10', status: 'Processing', total: 2500, items: 2 },
      ]);
      setEnrollments([
        { id: 1, course_name: 'Web Development Bootcamp', progress: 65, level: 'Intermediate', duration: '12 weeks', instructor: 'John Doe' },
        { id: 2, course_name: 'UI/UX Design Fundamentals', progress: 30, level: 'Beginner', duration: '8 weeks', instructor: 'Jane Smith' },
      ]);
      setAchievements([
        { id: 1, title: 'Course Completion', description: 'Completed first course', icon: 'trophy', earned_at: '2024-01-15' },
        { id: 2, title: 'Perfect Attendance', description: '30 days streak', icon: 'star', earned_at: '2024-01-10' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('apex_token');
      const response = await axios.put('http://127.0.0.1:8000/api/user/profile', profileData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setIsEditing(false);
      fetchUserProfile(); // Refresh user data in parent
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const token = localStorage.getItem('apex_token');
      const response = await axios.post('http://127.0.0.1:8000/api/user/avatar', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setProfileData(prev => ({ ...prev, avatar: response.data.avatar_url }));
      fetchUserProfile(); // Refresh user data
      alert('Avatar updated successfully!');
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      alert('Failed to upload avatar. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('apex_token');
        await axios.delete('http://127.0.0.1:8000/api/user', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        localStorage.removeItem('apex_token');
        navigate('/');
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete account:', error);
        alert('Failed to delete account. Please try again.');
      }
    }
  };

  const handleViewCourseDetails = (courseId) => {
    navigate(`/academy/courses/${courseId}`);
  };

  const handleViewOrderDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const handleDownloadCertificate = async (enrollmentId) => {
    try {
      const token = localStorage.getItem('apex_token');
      const response = await axios.get(`http://127.0.0.1:8000/api/enrollments/${enrollmentId}/certificate`, {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'certificate.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to download certificate:', error);
      alert('Certificate not available yet. Complete the course first.');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex justify-end">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative w-full max-w-xl bg-gradient-to-br from-emerald-50 to-green-50 h-full border-l-2 border-emerald-200 overflow-y-auto flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-emerald-700 font-medium">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" 
        onClick={close}
      ></div>
      
      {/* Side Panel */}
      <div className="relative w-full max-w-4xl bg-gradient-to-br from-emerald-50 to-green-50 h-full border-l-2 border-emerald-200 overflow-y-auto animate-slideInRight">
        {/* Close button */}
        <button 
          onClick={close}
          className="absolute top-6 right-6 z-20 p-2 bg-white border border-emerald-200 rounded-full hover:bg-emerald-50 hover:border-emerald-500 transition-all shadow-lg"
        >
          <X size={20} className="text-emerald-700" />
        </button>

        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-emerald-50/95 to-green-50/95 backdrop-blur-sm border-b border-emerald-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg">
                  {profileData.avatar ? (
                    <img 
                      src={profileData.avatar} 
                      alt={profileData.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    profileData.name?.[0]?.toUpperCase() || 'U'
                  )}
                </div>
                <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:bg-emerald-500 transition-colors">
                  <Edit size={10} className="text-white" />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
                <p className="text-sm text-emerald-600">Welcome back, {profileData.name?.split(' ')[0] || 'User'}!</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50 hover:border-emerald-500 transition-all"
              >
                {isEditing ? <Save size={18} /> : <Edit size={18} />}
                <span>{isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* User Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Profile Info Card */}
            <div className="lg:col-span-2 bg-white border-2 border-emerald-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User size={20} className="text-emerald-600" />
                Personal Information
              </h3>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="2547XXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter your address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-lg font-bold hover:shadow-md hover:shadow-emerald-200 transition-all"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-800">{profileData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-800">{profileData.phone || 'Not set'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-gray-800">{profileData.address || 'Not set'}</p>
                    </div>
                  </div>
                  {profileData.bio && (
                    <div className="pt-4 border-t border-emerald-100">
                      <p className="text-sm text-gray-500 mb-2">About</p>
                      <p className="text-gray-700">{profileData.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Stats Card */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-6 text-white">
                <div className="text-center">
                  <Award size={24} className="mx-auto mb-2" />
                  <p className="text-sm opacity-90">Member Since</p>
                  <p className="text-xl font-bold">{new Date(user?.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
              
              <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-700">{enrollments.length}</div>
                    <div className="text-sm text-emerald-600 font-medium">Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-700">{orders.length}</div>
                    <div className="text-sm text-emerald-600 font-medium">Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-700">
                      {enrollments.filter(e => e.progress === 100).length}
                    </div>
                    <div className="text-sm text-emerald-600 font-medium">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-700">{achievements.length}</div>
                    <div className="text-sm text-emerald-600 font-medium">Achievements</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-emerald-200 mb-6">
            <button className="flex-1 py-3 text-center font-bold text-emerald-600 border-b-2 border-emerald-600">
              Courses & Orders
            </button>
            <button 
              onClick={() => navigate('/achievements')}
              className="flex-1 py-3 text-center font-medium text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Achievements
            </button>
            <button 
              onClick={() => navigate('/settings')}
              className="flex-1 py-3 text-center font-medium text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Settings
            </button>
          </div>

          {/* Courses & Orders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* My Courses Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 border border-emerald-200 rounded-lg">
                    <GraduationCap size={20} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">My Courses</h3>
                </div>
                <span className="text-sm font-medium text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  {enrollments.length} enrolled
                </span>
              </div>

              {enrollments.length > 0 ? (
                <div className="space-y-3">
                  {enrollments.map((enrollment, index) => (
                    <div 
                      key={enrollment.id || index} 
                      className="bg-white border-2 border-emerald-200 rounded-xl p-4 hover:shadow-md hover:shadow-emerald-100 hover:border-emerald-500 transition-all duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Award size={16} className="text-emerald-600" />
                            <span className="text-xs font-medium text-emerald-700 px-2 py-1 bg-emerald-100 rounded-full">
                              {enrollment.level || 'Beginner'}
                            </span>
                          </div>
                          <h4 className="font-bold text-gray-800">{enrollment.course_name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{enrollment.instructor}</p>
                          
                          <div className="mt-3">
                            <div className="flex justify-between text-sm text-gray-500 mb-1">
                              <span>Progress</span>
                              <span>{enrollment.progress}%</span>
                            </div>
                            <div className="w-full bg-emerald-100 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-500" 
                                style={{ width: `${enrollment.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <button 
                            onClick={() => handleViewCourseDetails(enrollment.id)}
                            className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:shadow-md hover:shadow-emerald-200 transition-all"
                          >
                            <ChevronRight size={20} />
                          </button>
                          {enrollment.progress === 100 && (
                            <button 
                              onClick={() => handleDownloadCertificate(enrollment.id)}
                              className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-md hover:shadow-blue-200 transition-all"
                            >
                              <Download size={20} />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-emerald-700">
                          <Clock size={14} />
                          <span>{enrollment.duration}</span>
                        </div>
                        <span className={`text-sm font-bold ${
                          enrollment.progress === 100 
                            ? 'text-emerald-700' 
                            : 'text-amber-600'
                        }`}>
                          {enrollment.progress === 100 ? 'Completed ✓' : 'In Progress'}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {enrollments.length > 3 && (
                    <button 
                      onClick={() => navigate('/my-courses')}
                      className="w-full py-3 text-center text-emerald-600 font-bold border-2 border-dashed border-emerald-300 rounded-xl hover:bg-emerald-50 hover:border-emerald-500 transition-all"
                    >
                      View all {enrollments.length} courses
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-emerald-100 to-green-100 border-2 border-emerald-200 rounded-2xl p-8 text-center">
                  <GraduationCap size={48} className="text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-emerald-800 mb-2">No Courses Yet</h4>
                  <p className="text-emerald-700 mb-4 max-w-xs mx-auto">Start your learning journey with our premium courses</p>
                  <button 
                    onClick={() => navigate('/academy')}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2 rounded-lg font-bold hover:shadow-md hover:shadow-emerald-200 transition-all"
                  >
                    <Sparkles size={16} />
                    Browse Courses
                  </button>
                </div>
              )}
            </div>

            {/* Orders Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 border border-emerald-200 rounded-lg">
                    <ShoppingBag size={20} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
                </div>
                <span className="text-sm font-medium text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  {orders.length} orders
                </span>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order, index) => (
                    <div 
                      key={order.id || index} 
                      className="bg-white border-2 border-emerald-200 rounded-xl p-4 hover:shadow-md hover:shadow-emerald-100 transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Package size={16} className="text-emerald-600" />
                            <span className="font-bold text-gray-800">Order #{order.id}</span>
                          </div>
                          <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-700 mt-1">Ksh {order.total?.toLocaleString()} • {order.items} items</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'Delivered' 
                            ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' 
                            : order.status === 'Processing'
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                            : order.status === 'Shipped'
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-emerald-100">
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} className={
                            order.status === 'Delivered' 
                              ? 'text-emerald-600' 
                              : 'text-gray-400'
                          } />
                          <span className="text-sm text-gray-700">
                            {order.status === 'Delivered' 
                              ? 'Delivered successfully' 
                              : order.status === 'Processing'
                              ? 'Processing your order'
                              : 'Order placed'
                            }
                          </span>
                        </div>
                        <button 
                          onClick={() => handleViewOrderDetails(order.id)}
                          className="text-sm font-bold text-emerald-600 hover:text-emerald-800 hover:underline transition-colors"
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {orders.length > 3 && (
                    <button 
                      onClick={() => navigate('/my-orders')}
                      className="w-full py-3 text-center text-emerald-600 font-bold border-2 border-dashed border-emerald-300 rounded-xl hover:bg-emerald-50 hover:border-emerald-500 transition-all"
                    >
                      View all {orders.length} orders
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-emerald-100 to-green-100 border-2 border-emerald-200 rounded-2xl p-8 text-center">
                  <ShoppingBag size={48} className="text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-emerald-800 mb-2">No Orders Yet</h4>
                  <p className="text-emerald-700 mb-4 max-w-xs mx-auto">Check out our premium tech merchandise collection</p>
                  <button 
                    onClick={() => navigate('/shop')}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2 rounded-lg font-bold hover:shadow-md hover:shadow-emerald-200 transition-all"
                  >
                    <Sparkles size={16} />
                    Shop Now
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Achievements Preview */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 rounded-lg">
                  <Trophy size={20} className="text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Recent Achievements</h3>
              </div>
              <button 
                onClick={() => navigate('/achievements')}
                className="text-sm font-bold text-amber-600 hover:text-amber-700 hover:underline"
              >
                View All →
              </button>
            </div>

            {achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div 
                    key={achievement.id || index} 
                    className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full">
                        {achievement.icon === 'trophy' ? (
                          <Trophy size={20} className="text-white" />
                        ) : (
                          <Star size={20} className="text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-amber-700">
                      Earned on {new Date(achievement.earned_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 text-center">
                <Trophy size={32} className="text-amber-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-amber-800 mb-2">No Achievements Yet</h4>
                <p className="text-amber-700 mb-4">Complete courses and activities to earn achievements</p>
                <button 
                  onClick={() => navigate('/academy')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:shadow-md hover:shadow-amber-200 transition-all"
                >
                  <Target size={16} />
                  Start Learning
                </button>
              </div>
            )}
          </div>

          {/* Danger Zone */}
          <div className="mt-8 pt-6 border-t border-red-200">
            <h4 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
              <Shield size={20} />
              Danger Zone
            </h4>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h5 className="font-bold text-red-800">Delete Account</h5>
                  <p className="text-sm text-red-700">Once you delete your account, there is no going back.</p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-md hover:shadow-red-200 transition-all"
                >
                  <Trash2 size={18} />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;