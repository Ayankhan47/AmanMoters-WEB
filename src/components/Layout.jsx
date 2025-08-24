import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <span role="img" aria-label="Dealer Logo" style={{ fontWeight: 'bold', fontSize: 22 }}>
            🚗 Dealer
          </span>
        </div>
        <button
          className="navbar-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="hamburger" />
        </button>
        <div className={`navbar-links${menuOpen ? " open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          {!user && <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>}
          {!user && <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>}
          {isAdmin && (
            <Link
              to="/admin"
              className="admin-access-btn"
              onClick={() => setMenuOpen(false)}
            >
              Admin Access
            </Link>
          )}
          {user && (
            <button className="admin-access-btn" onClick={handleLogout} style={{ marginLeft: 8 }}>
              Logout
            </button>
          )}
        </div>
      </nav>
      <main className="main-content">{children}</main>
      <style>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          background: var(--card);
          border-bottom: 1px solid var(--border);
        }
        .navbar-logo {
          color: var(--text);
        }
        .navbar-links {
          display: flex;
          gap: 1.5rem;
        }
        .navbar-links a {
          color: var(--text);
          text-decoration: none;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .navbar-links a:hover {
          background: var(--button);
          color: var(--button-text);
        }
        .admin-access-btn {
          background: var(--button);
          color: var(--button-text);
          border: none;
          border-radius: 6px;
          padding: 0.4rem 1rem;
          font-size: 1rem;
          font-weight: 600;
          margin-left: 0.5rem;
          transition: background 0.2s, color 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .admin-access-btn:hover {
          background: var(--button-text);
          color: var(--button);
          border: 1px solid var(--button);
        }
        .navbar-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
        }
        .hamburger {
          width: 24px;
          height: 3px;
          background: var(--text);
          display: block;
          position: relative;
        }
        .hamburger::before,
        .hamburger::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 3px;
          background: var(--text);
          left: 0;
          transition: 0.2s;
        }
        .hamburger::before {
          top: -8px;
        }
        .hamburger::after {
          top: 8px;
        }
        @media (max-width: 700px) {
          .navbar-links {
            position: absolute;
            top: 56px;
            right: 0;
            background: var(--card);
            flex-direction: column;
            align-items: flex-end;
            width: 180px;
            padding: 1rem;
            border-radius: 0 0 0 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            gap: 1rem;
            display: none;
          }
          .navbar-links.open {
            display: flex;
          }
          .navbar-toggle {
            display: block;
          }
        }
        .main-content {
          padding: 2rem 1rem;
          background: var(--background);
          min-height: 80vh;
        }
      `}</style>
    </div>
  );
// ...existing code...