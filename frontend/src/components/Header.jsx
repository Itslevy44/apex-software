import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  ChevronDown,
  Home,
  GraduationCap,
  ShoppingBag,
  Phone,
  Info,
  LogIn,
  LogOut,
  Leaf,
  UserCircle
} from 'lucide-react';

const Header = ({ user, onLoginClick, onLogout, cartCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAcademyDropdownOpen, setIsAcademyDropdownOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', href: '/', icon: <Home size={18} /> },
    { name: 'About Us', href: '/about', icon: <Info size={18} /> },
    { name: 'Academy', href: '/academy', icon: <GraduationCap size={18} />, hasDropdown: true },
    { name: 'Shop', href: '/shop', icon: <ShoppingBag size={18} /> },
    { name: 'Contact Us', href: '/contact', icon: <Phone size={18} /> },
    { name: 'Cart', href: '/cart', icon: <ShoppingCart size={18} />, isCart: true },
  ];

  const academyCourses = [
    { name: 'Web Development', href: '/academy#web-development' },
    { name: 'Data Science', href: '/academy#data-science' },
    { name: 'Mobile App Dev', href: '/academy#mobile-app-dev' },
    { name: 'UI/UX Design', href: '/academy#ui-ux-design' },
    { name: 'Cybersecurity', href: '/academy#cybersecurity' }
  ];

  const handleProfileClick = () => {
    navigate('/profile');
    setShowProfileMenu(false);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-emerald-50 to-green-50 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-50 shadow-lg shadow-emerald-100/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-300/50">
                    <Leaf className="text-white" size={20} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
                
                <div className="hidden md:block">
                  <h1 className="text-2xl font-black tracking-tighter">
                    <span className="text-emerald-600">APEX</span>
                    <span className="text-gray-800">SOLUTIONS</span>
                  </h1>
                  <p className="text-xs text-emerald-500/80 font-light tracking-widest">TECHNOLOGY & INNOVATION</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.filter(item => !item.isCart).map((item) => (
                <div key={item.name} className="relative group">
                  {item.hasDropdown ? (
                    <div
                      className="flex items-center gap-2 px-5 py-3 text-gray-700 hover:text-emerald-600 transition-all duration-300 group-hover:bg-emerald-50 rounded-xl cursor-pointer"
                      onMouseEnter={() => setIsAcademyDropdownOpen(true)}
                      onMouseLeave={() => setIsAcademyDropdownOpen(false)}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                      
                      {/* Academy Dropdown */}
                      {isAcademyDropdownOpen && (
                        <div 
                          className="absolute top-full left-0 w-64 mt-2 bg-white border border-emerald-100 rounded-xl shadow-2xl shadow-emerald-100/50 p-4"
                          onMouseEnter={() => setIsAcademyDropdownOpen(true)}
                          onMouseLeave={() => setIsAcademyDropdownOpen(false)}
                        >
                          <h3 className="text-emerald-600 font-bold mb-3 text-sm">COURSES</h3>
                          <div className="space-y-2">
                            {academyCourses.map((course) => (
                              <Link
                                key={course.name}
                                to={course.href}
                                className="block px-3 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors text-sm"
                                onClick={() => setIsAcademyDropdownOpen(false)}
                              >
                                {course.name}
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-emerald-100">
                            <Link
                              to="/academy"
                              className="text-emerald-600 font-bold text-sm hover:underline inline-flex items-center gap-1"
                              onClick={() => setIsAcademyDropdownOpen(false)}
                            >
                              View All Courses →
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="flex items-center gap-2 px-5 py-3 text-gray-700 hover:text-emerald-600 transition-all duration-300 hover:bg-emerald-50 rounded-xl"
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              
              {/* Shopping Cart (Icon Only) */}
              <div className="relative">
                <Link
                  to="/cart"
                  className="p-2 hover:bg-emerald-50 rounded-xl transition-colors group relative"
                >
                  <ShoppingCart size={22} className="text-gray-700 group-hover:text-emerald-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Auth Buttons */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-xl hover:shadow-[0_0_25px_rgba(52,211,153,0.5)] transition-all duration-300 group shadow-md shadow-emerald-200"
                  >
                    <User size={18} />
                    <span>{user.name}</span>
                  </button>
                  
                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-emerald-100 rounded-xl shadow-2xl p-2 z-50">
                      <div className="px-4 py-2 border-b border-emerald-100">
                        <p className="font-bold text-gray-800 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors mt-2"
                      >
                        <UserCircle size={18} />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-xl hover:shadow-[0_0_25px_rgba(52,211,153,0.5)] transition-all duration-300 group shadow-md shadow-emerald-200"
                >
                  <LogIn size={18} />
                  <span>Login / Register</span>
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-emerald-50 rounded-xl transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-emerald-600" />
                ) : (
                  <Menu size={24} className="text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-emerald-100 pt-4 animate-slideDown">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors relative"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                    {item.isCart && cartCount > 0 && (
                      <span className="absolute right-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                ))}
                
                {/* Mobile User Menu */}
                {user ? (
                  <div className="mt-2 pt-2 border-t border-emerald-100">
                    <div className="px-4 py-2 mb-2">
                      <p className="font-bold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-emerald-50 rounded-xl transition-colors"
                    >
                      <UserCircle size={18} />
                      <span>My Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onLoginClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 mt-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-xl shadow-md shadow-emerald-200"
                  >
                    <LogIn size={18} />
                    <span>Login / Register</span>
                  </button>
                )}
              </div>
              
              {/* Mobile Academy Courses */}
              <div className="mt-4 pl-4 border-l-2 border-emerald-200">
                <h4 className="text-emerald-600 font-bold text-sm mb-2">ACADEMY COURSES</h4>
                <div className="grid grid-cols-2 gap-2">
                  {academyCourses.slice(0, 4).map((course) => (
                    <Link
                      key={course.name}
                      to={course.href}
                      className="text-xs px-3 py-2 bg-emerald-50 text-gray-600 rounded-lg hover:text-emerald-600 hover:bg-emerald-100 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {course.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Global Styles for Animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;