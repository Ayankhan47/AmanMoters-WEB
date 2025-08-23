import "./theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Stock from "./pages/Stock";
import Sell from "./pages/Sell";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/stock" element={<Stock />} />
          <Route path="/admin/sell" element={<Sell />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
