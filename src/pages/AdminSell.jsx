import React, { useState } from "react";

const sales = [
  { date: "2025-08-20", model: "Yamaha MT-15", buyer: "Rahul Sharma", price: "₹1,68,000" },
  { date: "2025-08-19", model: "Honda CB350", buyer: "Priya Singh", price: "₹1,99,000" },
  { date: "2025-08-18", model: "Royal Enfield Classic 350", buyer: "Amit Patel", price: "₹1,93,000" },
  { date: "2025-08-17", model: "Bajaj Pulsar 150", buyer: "Sunil Kumar", price: "₹1,10,000" },
  { date: "2025-08-16", model: "TVS Apache RTR 160", buyer: "Neha Verma", price: "₹1,20,000" },
];

export default function AdminSell() {
  const [query, setQuery] = useState("");
  const filtered = sales.filter(
    s =>
      s.model.toLowerCase().includes(query.toLowerCase()) ||
      s.buyer.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="admin-sell-bg">
      <div className="admin-sell-header">
        <h2>Sales Records</h2>
        <input
          className="admin-sell-search"
          type="text"
          placeholder="Search by model or buyer..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <div className="admin-sell-table-wrapper">
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
              <tr key={idx}>
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
            <div className="admin-sell-card" key={idx}>
              <div><b>Date:</b> {sale.date}</div>
              <div><b>Model:</b> {sale.model}</div>
              <div><b>Buyer:</b> {sale.buyer}</div>
              <div><b>Price:</b> {sale.price}</div>
            </div>
          ))}
        </div>
      </div>
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
