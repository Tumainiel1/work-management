import React from 'react';
import Header from './Header';
import SideNav from './UserSideNav';  // User specific SideNav
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
// import './UserLayout.css';  // Import the User Layout CSS file

function UserLayout() {
  return (
    <div className="layout-container">
      <div className="side-nav">
        <SideNav />  {/* User specific side navigation */}
      </div>
      <div className="content">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default UserLayout;
