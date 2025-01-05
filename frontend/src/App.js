import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import UserDashboard from "./components/Dashboards/UserDashboardComponents/UserDashboard";
import AdminDashboard from "./components/Dashboards/AdminDashboardComponents/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout"; // Admin Layout
import UserLayout from "./components/UserLayout"; // User Layout
import UserManagement from "./components/Dashboards/AdminDashboardComponents/UserManagement";
import EditUser from "./components/Dashboards/AdminDashboardComponents/EditUser";
import TaskManagement from "./components/Dashboards/AdminDashboardComponents/TaskList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />{" "}
        {/* Default redirect to register */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Admin Layout for Admin Routes */}
        <Route path="/" element={<AdminLayout />}>
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          {/* edit user route */}
          <Route
            path="/users/:id/edit"
            element={
              <ProtectedRoute isAdmin={true}>
                <EditUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasks"
            element={
              <ProtectedRoute isAdmin={true}>
                <TaskManagement />
              </ProtectedRoute>
            }
          />

        </Route>

      

        {/* User Layout for User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute isUser={true}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
