import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminSideNav() {
  const [menuState, setMenuState] = useState({});
  const navigate = useNavigate();

  const toggleMenu = (menuKey) => {
    setMenuState((prevState) => ({
      ...prevState,
      [menuKey]: !prevState[menuKey], // Toggle the menu state
    }));
  };

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    // Notify the user
    alert("You have been logged out.");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="index3.html" className="brand-link">
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>
      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Dashboard Menu */}
            <li className={`nav-item ${menuState.dashboard ? "menu-is-opening menu-open" : ""}`}>
              <a href="#" className="nav-link active" onClick={() => toggleMenu("dashboard")}>
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Dashboard
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/admin-dashboard" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Dashboard Page</p>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Products Menu */}
            <li className={`nav-item ${menuState.Products ? "menu-is-opening menu-open" : ""}`}>
              <a href="#" className="nav-link" onClick={() => toggleMenu("Products")}>
                <i className="nav-icon fas fa-boxes" />
                <p>
                  Products
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/product-list" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Product List</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/product-type" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Product Type</p>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Other Menus */}
            <li className="nav-item">
              <Link to="/department" className="nav-link">
                <i className="nav-icon fas fa-building" />
                <p>Departments List</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/employees" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>Employees</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                <i className="nav-icon fas fa-user" />
                <p>Profile</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>User Management</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tasks" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>Task Management</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="nav-link">
                <i className="nav-icon fas fa-sign-out-alt" />
                <p>Log out</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default AdminSideNav;
