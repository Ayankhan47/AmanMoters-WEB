import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import api from "../api/axios";


export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await api.post("/auth/register", {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });
      if (res.data && res.data.token && res.data.user) {
        register(res.data.user, res.data.token);
        navigate("/home");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  }

  return (
    <div className="register-bg">
      <form className="register-card" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="register-title">Register</h2>
        <input
          className="register-input"
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          name="confirm"
          type="password"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={handleChange}
          required
        />
  <button className="register-btn" type="submit">Register</button>
  {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        <div className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
      <style>{`
        .register-bg {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--background);
        }
        .register-card {
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
        .register-title {
          color: var(--text);
          text-align: center;
          margin-bottom: 0.5rem;
        }
        .register-input {
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--background);
          color: var(--text);
          font-size: 1rem;
          outline: none;
          transition: border 0.2s;
        }
        .register-input:focus {
          border-color: var(--button);
        }
        .register-btn {
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
        .register-btn:hover {
          background: var(--button-text);
          color: var(--button);
          border: 1px solid var(--button);
        }
        .register-link {
          text-align: center;
          margin-top: 0.5rem;
          color: var(--text);
          font-size: 0.97rem;
        }
        .register-link a {
          color: var(--button);
          text-decoration: underline;
        }
        @media (max-width: 500px) {
          .register-card {
            padding: 1.2rem 0.5rem 1rem 0.5rem;
            max-width: 98vw;
          }
        }
      `}</style>
    </div>
  );
}
