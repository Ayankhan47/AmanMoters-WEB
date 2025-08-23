import React from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  return (
    <div className="admin-dashboard-bg">
      <div className="admin-dashboard-container">
        <button
          className="admin-dashboard-card"
          onClick={() => navigate("/admin/stock")}
        >
          <span className="admin-dashboard-icon" role="img" aria-label="Stock">📦</span>
          <span>Manage Stock</span>
        </button>
        <button
          className="admin-dashboard-card"
          onClick={() => navigate("/admin/sell")}
        >
          <span className="admin-dashboard-icon" role="img" aria-label="Sales">💰</span>
          <span>View Sales</span>
        </button>
      </div>
      <style>{`
        .admin-dashboard-bg {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--background);
        }
        .admin-dashboard-container {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .admin-dashboard-card {
          background: var(--card);
          border: 2px solid var(--button);
          color: var(--text);
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          min-width: 220px;
          min-height: 160px;
          font-size: 1.4rem;
          font-weight: 600;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: box-shadow 0.2s, background 0.2s, color 0.2s;
          gap: 1.2rem;
        }
        .admin-dashboard-card:hover {
          background: var(--button);
          color: var(--button-text);
          box-shadow: 0 4px 18px rgba(0,0,0,0.13);
        }
        .admin-dashboard-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        @media (max-width: 700px) {
          .admin-dashboard-container {
            flex-direction: column;
            gap: 1.5rem;
          }
          .admin-dashboard-card {
            min-width: 90vw;
            padding: 2rem 0.5rem 1.5rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
