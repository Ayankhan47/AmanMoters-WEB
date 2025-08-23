import React from "react";

const bikes = [
  { model: "Yamaha MT-15", price: "₹1,68,000", quantity: 8 },
  { model: "Honda CB350", price: "₹1,99,000", quantity: 5 },
  { model: "Royal Enfield Classic 350", price: "₹1,93,000", quantity: 3 },
  { model: "Bajaj Pulsar 150", price: "₹1,10,000", quantity: 10 },
  { model: "TVS Apache RTR 160", price: "₹1,20,000", quantity: 7 },
];

export default function AdminStock() {
  return (
    <div className="admin-stock-bg">
      <div className="admin-stock-header">
        <h2>Available Bikes</h2>
        <button className="admin-stock-add-btn">Add New Bike</button>
      </div>
      <div className="admin-stock-table-wrapper">
        <table className="admin-stock-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map((bike, idx) => (
              <tr key={idx}>
                <td>{bike.model}</td>
                <td>{bike.price}</td>
                <td>{bike.quantity}</td>
                <td>
                  <button className="admin-stock-edit">Edit</button>
                  <button className="admin-stock-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Mobile stacked cards */}
        <div className="admin-stock-cards">
          {bikes.map((bike, idx) => (
            <div className="admin-stock-card" key={idx}>
              <div><b>Model:</b> {bike.model}</div>
              <div><b>Price:</b> {bike.price}</div>
              <div><b>Quantity:</b> {bike.quantity}</div>
              <div className="admin-stock-card-actions">
                <button className="admin-stock-edit">Edit</button>
                <button className="admin-stock-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .admin-stock-bg {
          background: var(--background);
          min-height: 70vh;
          padding: 2rem 1rem;
        }
        .admin-stock-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 900px;
          margin: 0 auto 1.5rem auto;
        }
        .admin-stock-header h2 {
          color: var(--text);
          font-size: 1.5rem;
          font-weight: 600;
        }
        .admin-stock-add-btn {
          background: var(--button);
          color: var(--button-text);
          border: none;
          border-radius: 6px;
          padding: 0.7rem 1.3rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .admin-stock-add-btn:hover {
          background: var(--button-text);
          color: var(--button);
          border: 1px solid var(--button);
        }
        .admin-stock-table-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }
        .admin-stock-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--card);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .admin-stock-table th, .admin-stock-table td {
          padding: 1rem 0.7rem;
          text-align: left;
          border-bottom: 1px solid var(--border);
          color: var(--text);
        }
        .admin-stock-table th {
          background: var(--card);
          font-size: 1.05rem;
        }
        .admin-stock-table td:last-child {
          min-width: 120px;
        }
        .admin-stock-edit, .admin-stock-delete {
          background: none;
          border: none;
          border-radius: 5px;
          padding: 0.4rem 0.9rem;
          font-size: 1rem;
          font-weight: 500;
          margin-right: 0.5rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .admin-stock-edit {
          color: var(--button);
          border: 1px solid var(--button);
        }
        .admin-stock-edit:hover {
          background: var(--button);
          color: var(--button-text);
        }
        .admin-stock-delete {
          color: #e11d48;
          border: 1px solid #e11d48;
        }
        .admin-stock-delete:hover {
          background: #e11d48;
          color: #fff;
        }
        /* Mobile stacked cards */
        .admin-stock-cards {
          display: none;
        }
        @media (max-width: 700px) {
          .admin-stock-table {
            display: none;
          }
          .admin-stock-cards {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
          }
          .admin-stock-card {
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
          .admin-stock-card-actions {
            margin-top: 0.7rem;
            display: flex;
            gap: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}
