import "./theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminStock from "./pages/AdminStock";
import AdminSell from "./pages/AdminSell";

import React, { useState, createContext } from "react";
import Layout from "./components/Layout";

export const AdminContext = createContext({ isAdmin: false, setIsAdmin: () => {} });

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/stock" element={<AdminStock />} />
            <Route path="/admin/sell" element={<AdminSell />} />
          </Routes>
        </Layout>
      </Router>
    </AdminContext.Provider>
  );
}

export default App;
