import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import api from "../api/axios";


export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  // Handle Google OAuth redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userStr = params.get("user");
    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        login(user, token);
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } catch {
        // ignore parse errors
      }
    }
  }, [login, navigate]);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      if (res.data && res.data.token && res.data.user) {
        login(res.data.user, res.data.token);
        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  }

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="login-title">Login</h2>
        <input
          className="login-input"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="login-input"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="login-btn" type="submit">Login</button>
        <button
          type="button"
          className="login-btn"
          style={{ background: '#4285F4', color: '#fff', marginTop: 8 }}
          onClick={() => {
            window.location.href = "http://localhost:5000/api/auth/google";
          }}
        >
          Login with Google
        </button>
  {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        <div className="login-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </form>
      <style>{`
        .login-bg {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--background);
        }
        .login-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          padding: 2rem 1.5rem 1.5rem 1.5rem;
          width: 100%;
          max-width: 370px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .login-title {
          color: var(--text);
          text-align: center;
          margin-bottom: 0.5rem;
        }
        .login-input {
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--background);
          color: var(--text);
          font-size: 1rem;
          outline: none;
          transition: border 0.2s;
        }
        .login-input:focus {
          border-color: var(--button);
        }
        .login-btn {
          background: var(--button);
          color: var(--button-text);
          border: none;
          border-radius: 6px;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .login-btn:hover {
          background: var(--button-text);
          color: var(--button);
          border: 1px solid var(--button);
        }
        .login-link {
          text-align: center;
          margin-top: 0.5rem;
          color: var(--text);
          font-size: 0.97rem;
        }
        .login-link a {
          color: var(--button);
          text-decoration: underline;
        }
        @media (max-width: 500px) {
          .login-card {
            padding: 1.2rem 0.5rem 1rem 0.5rem;
            max-width: 98vw;
          }
        }
      `}</style>
    </div>
  );
}
