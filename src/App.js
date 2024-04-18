import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import AdminPage from "./page/AdminPage";
import LoginPage from "./page/LoginPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/dashboard" element={<AdminPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
