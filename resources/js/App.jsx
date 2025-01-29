import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./LandingPages/Home";
import Features from "./LandingPages/Features";
import HowItWorks from "./LandingPages/HowItWorks";
import Login from "./LandingPages/Login";
import Dashboard from "./UserDashboard/Dashboard";
import AdminDashboard from "./AdminDashboard/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/login" element={<Login />} />

        {/* User Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
