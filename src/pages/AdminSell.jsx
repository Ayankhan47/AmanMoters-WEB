
import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../components/AuthContext";

export default function AdminSell() {
  const { token } = useAuth();
  const [sales, setSales] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ date: "", model: "", buyer: "", price: "" });

  useEffect(() => {
    async function fetchSales() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/admin/sales", { headers: { Authorization: `Bearer ${token}` } });
        setSales(res.data || []);
      } catch {
        setError("Failed to load sales.");
      } finally {
        setLoading(false);
      }
    }
    fetchSales();
  }, [token]);

  const filtered = sales.filter(
    s =>
      s.model.toLowerCase().includes(query.toLowerCase()) ||
      s.buyer.toLowerCase().includes(query.toLowerCase()) ||
      s.date.includes(query)
  );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/admin/sales",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSales([...sales, res.data]);
      setShowModal(false);
      setForm({ date: "", model: "", buyer: "", price: "" });
    } catch {
      alert("Failed to add sale.");
    }
  };

  return (
    <div className="admin-sell-bg">
      <div className="admin-sell-header">
        <h2>Sales Records</h2>
        <input
          className="admin-sell-search"
          type="text"
          placeholder="Search by date, model, or buyer..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="admin-sell-add-btn" onClick={() => setShowModal(true)}>Add Sale</button>
      </div>
      <div className="admin-sell-table-wrapper">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <>
            <table className="admin-sell-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Model</th>
                  <th>Buyer Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((sale, idx) => (
                  <tr key={sale._id || idx}>
                    <td>{sale.date}</td>
                    <td>{sale.model}</td>
                    <td>{sale.buyer}</td>
                    <td>{sale.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Mobile stacked cards */}
            <div className="admin-sell-cards">
              {filtered.map((sale, idx) => (
                <div className="admin-sell-card" key={sale._id || idx}>
                  <div><b>Date:</b> {sale.date}</div>
                  <div><b>Model:</b> {sale.model}</div>
                  <div><b>Buyer:</b> {sale.buyer}</div>
                  <div><b>Price:</b> {sale.price}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal for Add Sale */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Add Sale</h3>
            <form onSubmit={handleFormSubmit}>
              <input name="date" value={form.date} onChange={handleFormChange} placeholder="Date (YYYY-MM-DD)" required />
              <input name="model" value={form.model} onChange={handleFormChange} placeholder="Model" required />
              <input name="buyer" value={form.buyer} onChange={handleFormChange} placeholder="Buyer Name" required />
              <input name="price" value={form.price} onChange={handleFormChange} placeholder="Price" required />
              <button type="submit">Save</button>
            </form>
            <button onClick={() => setShowModal(false)} style={{ marginTop: 8 }}>Cancel</button>
          </div>
          <style>{`
            .modal-overlay {
              position: fixed;
              top: 0; left: 0; right: 0; bottom: 0;
              background: rgba(0,0,0,0.4);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1000;
            }
            .modal-content {
              background: #fff;
              padding: 2rem 1.5rem;
              border-radius: 10px;
              min-width: 300px;
              max-width: 90vw;
              box-shadow: 0 4px 24px rgba(0,0,0,0.18);
              text-align: center;
            }
            .modal-content input {
              display: block;
              margin: 0.7rem auto;
              padding: 0.6rem 1rem;
              width: 90%;
              border: 1px solid #ccc;
              border-radius: 6px;
            }
            .modal-content button {
              margin-top: 1rem;
              padding: 0.6rem 1.5rem;
              border-radius: 6px;
              border: none;
              background: var(--button);
              color: var(--button-text);
              font-weight: 600;
              cursor: pointer;
            }
          `}</style>
        </div>
      )}
      <style>{`
        .admin-sell-bg {
          background: var(--background);
          min-height: 70vh;
          padding: 2rem 1rem;
        }
        .admin-sell-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 900px;
          margin: 0 auto 1.5rem auto;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .admin-sell-header h2 {
          color: var(--text);
          font-size: 1.5rem;
          font-weight: 600;
        }
        .admin-sell-search {
          padding: 0.7rem 1rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--background);
          color: var(--text);
          font-size: 1rem;
          outline: none;
          min-width: 220px;
          transition: border 0.2s;
        }
        .admin-sell-search:focus {
          border-color: var(--button);
        }
        .admin-sell-table-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }
        .admin-sell-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--card);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .admin-sell-table th, .admin-sell-table td {
          padding: 1rem 0.7rem;
          text-align: left;
          border-bottom: 1px solid var(--border);
          color: var(--text);
        }
        .admin-sell-table th {
          background: var(--card);
          font-size: 1.05rem;
        }
        /* Mobile stacked cards */
        .admin-sell-cards {
          display: none;
        }
        @media (max-width: 700px) {
          .admin-sell-table {
            display: none;
          }
          .admin-sell-cards {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
          }
          .admin-sell-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            padding: 1.2rem 1rem;
            color: var(--text);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
