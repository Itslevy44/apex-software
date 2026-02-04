import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ user, onLoginClick, onLogout, cartCount }) => {
  return (
    <div className="bg-apex-navy min-h-screen">
      <Header 
        user={user} 
        onLoginClick={onLoginClick} 
        onLogout={onLogout}
        cartCount={cartCount}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;