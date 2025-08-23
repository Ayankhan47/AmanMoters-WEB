import React from "react";

const bikes = [
  {
    model: "Yamaha MT-15",
    price: "₹1,68,000",
    img: "https://cdn.pixabay.com/photo/2017/01/06/19/15/motorcycle-1957037_1280.jpg",
  },
  {
    model: "Honda CB350",
    price: "₹1,99,000",
    img: "https://cdn.pixabay.com/photo/2016/11/29/09/32/motorcycle-1868946_1280.jpg",
  },
  {
    model: "Royal Enfield Classic 350",
    price: "₹1,93,000",
    img: "https://cdn.pixabay.com/photo/2017/08/06/00/47/motorcycle-2581882_1280.jpg",
  },
  {
    model: "Bajaj Pulsar 150",
    price: "₹1,10,000",
    img: "https://cdn.pixabay.com/photo/2015/01/19/13/51/motorcycle-604019_1280.jpg",
  },
  {
    model: "TVS Apache RTR 160",
    price: "₹1,20,000",
    img: "https://cdn.pixabay.com/photo/2016/11/29/09/32/motorcycle-1868946_1280.jpg",
  },
  {
    model: "Suzuki Gixxer",
    price: "₹1,30,000",
    img: "https://cdn.pixabay.com/photo/2017/01/06/19/15/motorcycle-1957037_1280.jpg",
  },
];

export default function Home() {
  const adThumbnails = [
    {
      img: "https://cdn.pixabay.com/photo/2017/01/06/19/15/motorcycle-1957037_1280.jpg",
      text: "Get up to 10% off on select models!",
    },
    {
      img: "https://cdn.pixabay.com/photo/2016/11/29/09/32/motorcycle-1868946_1280.jpg",
      text: "Free helmet with every new bike purchase!",
    },
    {
      img: "https://cdn.pixabay.com/photo/2017/08/06/00/47/motorcycle-2581882_1280.jpg",
      text: "Easy EMI options available at Aman Motors.",
    },
    {
      img: "https://cdn.pixabay.com/photo/2015/01/19/13/51/motorcycle-604019_1280.jpg",
      text: "Exchange your old bike for a new one!",
    },
  ];
  const [adIndex, setAdIndex] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setAdIndex((i) => (i + 1) % adThumbnails.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-root">
      <div className="ad-thumb-slider">
        <div className="ad-thumb-slide">
          <img src={adThumbnails[adIndex].img} alt="ad" className="ad-thumb-img" />
          <span className="ad-thumb-text">{adThumbnails[adIndex].text}</span>
        </div>
      </div>
      <section className="home-hero">
        <div className="home-hero-logo">🚗</div>
        <h1 className="home-hero-title">Aman Motors</h1>
        <p className="home-hero-tagline">Your Trusted Bike Dealer in Town</p>
      </section>
      <section className="home-bikes">
        <h2 className="home-bikes-title">Our Portfolio</h2>
        <div className="home-bikes-grid">
          {bikes.map((bike, idx) => (
            <div className="bike-card" key={idx}>
              <img className="bike-img" src={bike.img} alt={bike.model} />
              <div className="bike-info">
                <div className="bike-model">{bike.model}</div>
                <div className="bike-price">{bike.price}</div>
                <button className="bike-offer-btn">View Offers</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <style>{`
        .ad-thumb-slider {
          width: 100%;
          background: var(--button);
          color: var(--button-text);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 0;
          min-height: 3.5rem;
          overflow: hidden;
        }
        .ad-thumb-slide {
          display: flex;
          align-items: center;
          gap: 1rem;
          animation: slideInThumb 0.5s;
        }
        .ad-thumb-img {
          width: 56px;
          height: 36px;
          object-fit: cover;
          border-radius: 6px;
          border: 2px solid var(--border);
          background: var(--card);
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .ad-thumb-text {
          font-size: 1.08rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: var(--button-text);
        }
        @keyframes slideInThumb {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .home-root {
          background: var(--background);
          color: var(--text);
          min-height: 80vh;
        }
        .home-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1rem 1.5rem 1rem;
        }
        .home-hero-logo {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }
        .home-hero-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin: 0.2rem 0 0.5rem 0;
          color: var(--text);
        }
        .home-hero-tagline {
          font-size: 1.1rem;
          color: var(--text);
          opacity: 0.8;
        }
        .home-bikes {
          padding: 1.5rem 1rem 2.5rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .home-bikes-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--text);
          text-align: center;
        }
        .home-bikes-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
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
        @media (min-width: 700px) {
          .home-bikes-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
