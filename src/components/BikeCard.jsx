import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../api/axios";

export default function BikeCard({ image, modelName, price, offerText }) {

  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleViewOffers = async () => {
    setShowModal(true);
    setLoading(true);
    setError("");
    try {
      // Fetch bike details by modelName (or ideally by id if available)
      const res = await api.get(`/bikes/details?modelName=${encodeURIComponent(modelName)}`);
      setDetails(res.data);
    } catch (err) {
      setError("Failed to fetch bike details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bike-card">
        <img className="bike-img" src={image} alt={modelName} />
        <div className="bike-info">
          <div className="bike-model">{modelName}</div>
          <div className="bike-price">{price}</div>
          <button className="bike-offer-btn" onClick={handleViewOffers}>{offerText || "View Offers"}</button>
        </div>
        <style>{`
          .bike-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.06);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem 1rem 1.5rem 1rem;
            transition: box-shadow 0.2s;
          }
          .bike-card:hover {
            box-shadow: 0 4px 18px rgba(0,0,0,0.13);
          }
          .bike-img {
            width: 100%;
            max-width: 260px;
            height: 140px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 1rem;
            background: var(--border);
          }
          .bike-info {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }
          .bike-model {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text);
          }
          .bike-price {
            color: var(--button);
            font-size: 1rem;
            font-weight: 500;
          }
          .bike-offer-btn {
            margin-top: 0.5rem;
            background: var(--button);
            color: var(--button-text);
            border: none;
            border-radius: 6px;
            padding: 0.5rem 1.2rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          }
          .bike-offer-btn:hover {
            background: var(--button-text);
            color: var(--button);
            border: 1px solid var(--button);
          }
          @media (max-width: 700px) {
            .bike-card {
              max-width: 98vw;
            }
          }
        `}</style>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div style={{ color: 'red' }}>{error}</div>
            ) : details ? (
              <>
                <h2>{details.modelName}</h2>
                <img src={details.imageUrl} alt={details.modelName} style={{ width: '100%', maxWidth: 300, borderRadius: 8 }} />
                <p>Price: {details.price}</p>
                <p>Offer: {details.offer}</p>
                <p>{details.description}</p>
                <button onClick={() => setShowModal(false)} style={{ marginTop: 12 }}>Close</button>
              </>
            ) : null}
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
          `}</style>
        </div>
      )}
    </>

  );
}

BikeCard.PropTypes = {
  image: PropTypes.string.isRequired,
  modelName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  offerText: PropTypes.string,
};
