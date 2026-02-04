import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, Bell, Shield, CreditCard, HelpCircle, Moon, User, Lock, Globe } from 'lucide-react';

const UserSettings = ({ user }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    course_updates: true,
    promotions: false,
  });
  const [darkMode, setDarkMode] = useState(false);

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/profile')}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4"
          >
            ← Back to Profile
          </button>
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon size={28} className="text-emerald-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Settings</h1>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <User size={20} className="text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-800">Profile Settings</h2>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="w-full text-left px-4 py-3 border border-emerald-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Edit Profile Information</p>
                  <p className="text-sm text-gray-600">Update your name, email, phone, and other details</p>
                </div>
                <div className="text-emerald-600">→</div>
              </div>
            </button>
          </div>

          {/* Notifications */}
          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell size={20} className="text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">
                      {key.replace('_', ' ').charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)} Notifications
                    </p>
                    <p className="text-sm text-gray-600">Receive {key.replace('_', ' ')} notifications</p>
                  </div>
                  <button
                    onClick={() => toggleNotification(key)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      value ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transform transition-transform absolute top-0.5 ${
                      value ? 'translate-x-7' : 'translate-x-1'
                    }`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Moon size={20} className="text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-800">Appearance</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setDarkMode(false)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  !darkMode 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Light Mode
              </button>
              <button
                onClick={() => setDarkMode(true)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  darkMode 
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Dark Mode
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Lock size={20} className="text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-800">Security</h2>
            </div>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-emerald-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Change Password</p>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                  <div className="text-emerald-600">→</div>
                </div>
              </button>
              <button className="w-full text-left px-4 py-3 border border-emerald-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add extra security to your account</p>
                  </div>
                  <div className="text-emerald-600">→</div>
                </div>
              </button>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard size={20} className="text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-800">Payment Methods</h2>
            </div>
            <button className="w-full text-left px-4 py-3 border border-emerald-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Manage Payment Methods</p>
                  <p className="text-sm text-gray-600">Add or remove M-Pesa and card details</p>
                </div>
                <div className="text-emerald-600">→</div>
              </div>
            </button>
          </div>

          {/* Language & Region */}
          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Globe size={20} className="text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-800">Language & Region</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Language</p>
                  <p className="text-sm text-gray-600">English (Kenya)</p>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700">Change</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Time Zone</p>
                  <p className="text-sm text-gray-600">East Africa Time (GMT+3)</p>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700">Change</button>
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle size={20} className="text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-800">Help & Support</h2>
            </div>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-emerald-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Help Center</p>
                    <p className="text-sm text-gray-600">Browse help articles and FAQs</p>
                  </div>
                  <div className="text-emerald-600">→</div>
                </div>
              </button>
              <button className="w-full text-left px-4 py-3 border border-emerald-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Contact Support</p>
                    <p className="text-sm text-gray-600">Get help from our support team</p>
                  </div>
                  <div className="text-emerald-600">→</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;