import React from 'react';
import Header from './Header';
import SideNav from './AdminSideNav';  // Admin specific SideNav
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
// import './AdminLayout.css';  // Import the Admin Layout CSS file

function AdminLayout() {
  return (
    <div className="layout-container">
      <div className="side-nav">
        <SideNav />  {/* Admin specific side navigation */}
      </div>
      <div className="content">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
