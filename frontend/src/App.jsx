import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Academy from './components/Academy';
import About from './components/About';
import Shop from './components/Shop';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Achievements from './components/Achievements';
import Settings from './components/Settings';
import PhoneModal from './components/PhoneModal';
import AuthModal from './components/AuthModal';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('apex_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [userOrders, setUserOrders] = useState([]);
  const [userEnrollments, setUserEnrollments] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState(null);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('apex_cart', JSON.stringify(cart));
  }, [cart]);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('apex_token');
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  // Fetch user data when user changes
  useEffect(() => {
    if (user) {
      fetchAllUserData();
    }
  }, [user]);

  const fetchUserProfile = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('apex_token');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('apex_token');
      if (!token) return;

      const headers = { 'Authorization': `Bearer ${token}` };

      // Fetch orders
      const ordersResponse = await axios.get('http://127.0.0.1:8000/api/user/orders', { headers });
      setUserOrders(ordersResponse.data.data || ordersResponse.data.orders || []);

      // Fetch enrollments
      const enrollmentsResponse = await axios.get('http://127.0.0.1:8000/api/user/enrollments', { headers });
      setUserEnrollments(enrollmentsResponse.data.data || enrollmentsResponse.data.enrollments || []);

      // Fetch achievements
      const achievementsResponse = await axios.get('http://127.0.0.1:8000/api/user/achievements', { headers });
      setUserAchievements(achievementsResponse.data.data || achievementsResponse.data.achievements || []);

    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('apex_token', token);
      setUser(user);
      setShowAuthModal(false);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.'
      };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name, email, password, passwordConfirmation) => {
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      });

      const { token, user } = response.data;
      localStorage.setItem('apex_token', token);
      setUser(user);
      setShowAuthModal(false);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.response?.data?.errors?.email?.[0] ||
          error.response?.data?.message ||
          'Registration failed. Please try again.'
      };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('apex_token');
      if (token) {
        await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('apex_token');
      setUser(null);
      setUserOrders([]);
      setUserEnrollments([]);
      setUserAchievements([]);
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
      const newCart = [...cart];
      newCart[existingProductIndex].quantity = (newCart[existingProductIndex].quantity || 1) + 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Sync with backend if logged in
    const token = localStorage.getItem('apex_token');
    if (token) {
      try {
        await axios.post(`http://127.0.0.1:8000/api/cart/add/${product.id}`, { quantity: 1 }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (error) {
        console.error('Failed to sync cart item with backend:', error);
      }
    }
  };

  const removeFromCart = async (index) => {
    const item = cart[index];
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);

    const token = localStorage.getItem('apex_token');
    if (token && item) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/cart/remove/${item.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (error) {
        console.error('Failed to sync item removal with backend:', error);
      }
    }
  };

  const clearCart = async () => {
    setCart([]);
    const token = localStorage.getItem('apex_token');
    if (token) {
      try {
        await axios.post('http://127.0.0.1:8000/api/cart/clear', {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (error) {
        console.error('Failed to clear cart on backend:', error);
      }
    }
  };

  const updateQuantity = (index, quantity) => {
    const newCart = [...cart];
    if (newCart[index] && quantity > 0) {
      newCart[index].quantity = quantity;
      setCart(newCart);
    } else if (quantity <= 0) {
      removeFromCart(index);
    }
  };

  const handleEnroll = async (course) => {
    if (!user) {
      setShowAuthModal(true);
      alert('Please login to enroll in courses');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`http://127.0.0.1:8000/api/courses/${course.id}/enroll`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('apex_token')}`
        }
      });

      // Refresh enrollments after successful enrollment
      fetchAllUserData();
      alert(`Successfully enrolled in ${course.title}!`);
    } catch (error) {
      console.error('Enrollment error:', error);
      alert(error.response?.data?.message || 'Enrollment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMpesaCheckout = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    if (total === 0) {
      alert('Your cart is empty');
      return;
    }

    // Capture current cart state for checkout
    setPendingCheckout({ total });
    setShowPhoneModal(true);
  };

  const processPayment = async (phone) => {
    setShowPhoneModal(false);
    try {
      setLoading(true);
      const token = localStorage.getItem('apex_token');

      // 1. Ensure backend cart sync (optional but good for robustness)
      // For now, assume Cart exists or create it on the fly if OrderController allows

      // 2. Create Order
      const orderResponse = await axios.post('http://127.0.0.1:8000/api/orders', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message || 'Failed to create order');
      }

      const orderId = orderResponse.data.data.id;

      // 3. Initiate Payment
      await axios.post(`http://127.0.0.1:8000/api/orders/${orderId}/pay`, {
        phone: phone
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      alert("Payment initiated! Please check your phone for the M-Pesa PIN prompt.");
      setCart([]);
      fetchAllUserData();

    } catch (error) {
      console.error("Checkout Error", error);
      alert(error.response?.data?.message || error.message || 'Checkout failed. Please try again.');
    } finally {
      setLoading(false);
      setPendingCheckout(null);
    }
  };

  // Global loading overlay
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Routes>
          <Route path="/" element={
            <Layout
              user={user}
              onLoginClick={() => setShowAuthModal(true)}
              onLogout={handleLogout}
              cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
            />
          }>
            {/* Home is now the landing page */}
            <Route index element={<Home />} />
            <Route path="academy" element={<Academy enrollInCourse={handleEnroll} />} />
            <Route path="about" element={<About />} />
            <Route path="shop" element={<Shop addToCart={addToCart} />} />
            <Route path="cart" element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                handleMpesaCheckout={handleMpesaCheckout}
                updateQuantity={updateQuantity}
                user={user}
              />
            } />
            <Route path="contact" element={<Contact />} />

            {/* Protected Routes - Only accessible when logged in */}
            <Route path="profile" element={
              user ? (
                <Profile
                  user={user}
                  orders={userOrders}
                  enrollments={userEnrollments}
                  achievements={userAchievements}
                  close={() => window.history.back()}
                  fetchUserProfile={() => fetchUserProfile(localStorage.getItem('apex_token'))}
                />
              ) : (
                <div className="flex items-center justify-center min-h-[60vh]">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login First</h2>
                    <p className="text-gray-600 mb-6">You need to be logged in to view your profile</p>
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-md transition-all hover:scale-105"
                    >
                      Login to Continue
                    </button>
                  </div>
                </div>
              )
            } />

            <Route path="achievements" element={
              user ? (
                <Achievements
                  achievements={userAchievements}
                  user={user}
                />
              ) : (
                <Navigate to="/" replace />
              )
            } />

            <Route path="settings" element={
              user ? (
                <Settings user={user} />
              ) : (
                <Navigate to="/" replace />
              )
            } />

            {/* Order details route */}
            <Route path="orders/:orderId" element={
              user ? (
                <div className="min-h-[60vh] flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h2>
                    <p className="text-gray-600">Order details page will be implemented soon</p>
                  </div>
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            } />

            {/* My courses route */}
            <Route path="my-courses" element={
              user ? (
                <div className="min-h-[60vh] flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">My Courses</h2>
                    <p className="text-gray-600">All enrolled courses will be displayed here</p>
                  </div>
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            } />

            {/* My orders route */}
            <Route path="my-orders" element={
              user ? (
                <div className="min-h-[60vh] flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">My Orders</h2>
                    <p className="text-gray-600">All your orders will be displayed here</p>
                  </div>
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            } />
          </Route>
        </Routes>

        {/* Auth Modal */}
        {showAuthModal && (
          <AuthModal
            setUser={setUser}
            close={() => setShowAuthModal(false)}
            onLogin={handleLogin}
            onRegister={handleRegister}
            isLoading={loading}
          />
        )}
        {/* Phone Modal */}
        <PhoneModal
          isOpen={showPhoneModal}
          onClose={() => setShowPhoneModal(false)}
          onConfirm={processPayment}
          initialValue={user?.phone || ''}
        />

      </div>
    </Router>
  );
}

export default App;