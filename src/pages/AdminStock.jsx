import React from "react";

const bikes = [
  { model: "Yamaha MT-15", price: "₹1,68,000", quantity: 8 },
  { model: "Honda CB350", price: "₹1,99,000", quantity: 5 },
  { model: "Royal Enfield Classic 350", price: "₹1,93,000", quantity: 3 },
  { model: "Bajaj Pulsar 150", price: "₹1,10,000", quantity: 10 },
  { model: "TVS Apache RTR 160", price: "₹1,20,000", quantity: 7 },
];

import { useEffect, useState } from "react";
import api from "../api/axios";
import { uploadToImageKit } from "../utils/imagekit";
import { useAuth } from "../components/AuthContext";

export default function AdminStock() {
  const { token } = useAuth();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'
  const [form, setForm] = useState({ model: "", price: "", stockQuantity: "", image: null });
  const [editId, setEditId] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);

  useEffect(() => {
    async function fetchBikes() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/admin/bikes", { headers: { Authorization: `Bearer ${token}` } });
        setBikes(res.data || []);
      } catch (err) {
        setError("Failed to load bikes.");
      } finally {
        setLoading(false);
      }
    }
    fetchBikes();
  }, [token]);

  const openAddModal = () => {
    setForm({ model: "", price: "", stockQuantity: "", image: null });
    setModalType("add");
    setShowModal(true);
    setEditId(null);
  };

  const openEditModal = (bike) => {
    setForm({ model: bike.model, price: bike.price, stockQuantity: bike.stockQuantity, image: null });
    setModalType("edit");
    setShowModal(true);
    setEditId(bike._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bike?")) return;
    try {
      await api.delete(`/admin/bikes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setBikes(bikes.filter(b => b._id !== id));
    } catch {
      alert("Failed to delete bike.");
    }
  };

  // ImageKit upload helper


  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm(f => ({ ...f, image: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = undefined;
    try {
      if (form.image) {
        setImgUploading(true);
        imageUrl = await uploadToImageKit(form.image);
        setImgUploading(false);
      }
      if (modalType === "add") {
        const res = await api.post(
          "/admin/bikes",
          { model: form.model, price: form.price, stockQuantity: form.stockQuantity, imageUrl },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBikes([...bikes, res.data]);
      } else if (modalType === "edit") {
        const res = await api.put(
          `/admin/bikes/${editId}`,
          { model: form.model, price: form.price, stockQuantity: form.stockQuantity, ...(imageUrl && { imageUrl }) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBikes(bikes.map(b => (b._id === editId ? res.data : b)));
      }
      setShowModal(false);
    } catch {
      setImgUploading(false);
      alert("Failed to save bike.");
    }
  };

  return (
    <div className="admin-stock-bg">
      <div className="admin-stock-header">
        <h2>Available Bikes</h2>
        <button className="admin-stock-add-btn" onClick={openAddModal}>Add New Bike</button>
      </div>
      <div className="admin-stock-table-wrapper">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <>
            <table className="admin-stock-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bikes.map((bike) => (
                  <tr key={bike._id}>
                    <td>{bike.model}</td>
                    <td>{bike.price}</td>
                    <td>{bike.stockQuantity}</td>
                    <td>
                      <button className="admin-stock-edit" onClick={() => openEditModal(bike)}>Edit</button>
                      <button className="admin-stock-delete" onClick={() => handleDelete(bike._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Mobile stacked cards */}
            <div className="admin-stock-cards">
              {bikes.map((bike) => (
                <div className="admin-stock-card" key={bike._id}>
                  <div><b>Model:</b> {bike.model}</div>
                  <div><b>Price:</b> {bike.price}</div>
                  <div><b>Stock:</b> {bike.stockQuantity}</div>
                  <div className="admin-stock-card-actions">
                    <button className="admin-stock-edit" onClick={() => openEditModal(bike)}>Edit</button>
                    <button className="admin-stock-delete" onClick={() => handleDelete(bike._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{modalType === "add" ? "Add New Bike" : "Edit Bike"}</h3>
            <form onSubmit={handleFormSubmit}>
              <input name="model" value={form.model} onChange={handleFormChange} placeholder="Model Name" required />
              <input name="price" value={form.price} onChange={handleFormChange} placeholder="Price" required />
              <input name="stockQuantity" value={form.stockQuantity} onChange={handleFormChange} placeholder="Stock Quantity" type="number" required />
              <input name="image" type="file" accept="image/*" onChange={handleFormChange} />
              <button type="submit" disabled={imgUploading}>{imgUploading ? "Uploading..." : "Save"}</button>
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
