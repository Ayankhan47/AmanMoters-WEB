import React from "react";
import PropTypes from "prop-types";

export default function BikeCard({ image, modelName, price, offerText }) {
  return (
    <div className="bike-card">
      <img className="bike-img" src={image} alt={modelName} />
      <div className="bike-info">
        <div className="bike-model">{modelName}</div>
        <div className="bike-price">{price}</div>
        <button className="bike-offer-btn">{offerText || "View Offers"}</button>
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
  );
}

BikeCard.propTypes = {
  image: PropTypes.string.isRequired,
  modelName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  offerText: PropTypes.string,
};
