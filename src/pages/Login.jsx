import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../App";


export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setIsAdmin } = useContext(AdminContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.email === "admin@bajaj.com" && form.password === "admin123") {
      setIsAdmin(true);
      navigate("/admin");
    } else {
      setIsAdmin(false);
      // Optionally show error or handle user login
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
