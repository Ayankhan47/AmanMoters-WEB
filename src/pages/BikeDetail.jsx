import React from "react";
import { useParams } from "react-router-dom";

const bikes = [
  {
    id: 1,
    model: "Yamaha MT-15",
    price: "₹1,68,000",
    img: "https://cdn.pixabay.com/photo/2017/01/06/19/15/motorcycle-1957037_1280.jpg",
    description: "A sporty street bike with advanced features and aggressive styling.",
    emi: "From ₹3,200/month",
    offers: ["10% off on select models", "Free helmet with purchase"],
  },
  {
    id: 2,
    model: "Honda CB350",
    price: "₹1,99,000",
    img: "https://cdn.pixabay.com/photo/2016/11/29/09/32/motorcycle-1868946_1280.jpg",
    description: "Classic design with modern technology and smooth performance.",
    emi: "From ₹3,800/month",
    offers: ["5% cashback on EMI", "Free first service"],
  },
  {
    id: 3,
    model: "Royal Enfield Classic 350",
    price: "₹1,93,000",
    img: "https://cdn.pixabay.com/photo/2017/08/06/00/47/motorcycle-2581882_1280.jpg",
    description: "Iconic cruiser with timeless looks and a thumping engine.",
    emi: "From ₹3,700/month",
    offers: ["Exchange bonus up to ₹5,000"],
  },
  {
    id: 4,
    model: "Bajaj Pulsar 150",
    price: "₹1,10,000",
    img: "https://cdn.pixabay.com/photo/2015/01/19/13/51/motorcycle-604019_1280.jpg",
    description: "Popular commuter bike with great mileage and performance.",
    emi: "From ₹2,200/month",
    offers: ["Zero down payment offer"],
  },
  {
    id: 5,
    model: "TVS Apache RTR 160",
    price: "₹1,20,000",
    img: "https://cdn.pixabay.com/photo/2016/11/29/09/32/motorcycle-1868946_1280.jpg",
    description: "Racing DNA with advanced features and sporty looks.",
    emi: "From ₹2,400/month",
    offers: ["Free accessories worth ₹2,000"],
  },
  {
    id: 6,
    model: "Suzuki Gixxer",
    price: "₹1,30,000",
    img: "https://cdn.pixabay.com/photo/2017/01/06/19/15/motorcycle-1957037_1280.jpg",
    description: "Stylish street bike with refined engine and great handling.",
    emi: "From ₹2,600/month",
    offers: ["Special festive discount"],
  },
];

export default function BikeDetail() {
  const { id } = useParams();
  const bike = bikes.find((b) => b.id === Number(id));
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    // Here you would send the email/quotation request
  }

  if (!bike) return <div style={{textAlign:'center',marginTop:'3rem',color:'var(--text)'}}>Bike not found.</div>;

  return (
    <div className="bike-detail-bg">
      <div className="bike-detail-card">
        <img src={bike.img} alt={bike.model} className="bike-detail-img" />
        <div className="bike-detail-info">
          <h2>{bike.model}</h2>
          <div className="bike-detail-price">{bike.price}</div>
          <p className="bike-detail-desc">{bike.description}</p>
          <div className="bike-detail-emi">EMI: {bike.emi}</div>
          <div className="bike-detail-offers">
            <b>Offers:</b>
            <ul>
              {bike.offers.map((offer, i) => <li key={i}>{offer}</li>)}
            </ul>
          </div>
          <form className="bike-detail-quote" onSubmit={handleSubmit}>
            <label htmlFor="email">Get Quotation by Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button type="submit">Request Quote</button>
            {sent && <div className="bike-detail-sent">Quotation request sent!</div>}
          </form>
        </div>
      </div>
      <style>{`
        .bike-detail-bg {
          background: var(--background);
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }
        .bike-detail-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 370px;
          width: 100%;
          padding: 1.5rem 1rem;
          gap: 1.2rem;
        }
        .bike-detail-img {
          width: 100%;
          max-width: 320px;
          height: 180px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 1rem;
        }
        .bike-detail-info h2 {
          margin: 0.2rem 0 0.5rem 0;
          color: var(--text);
        }
        .bike-detail-price {
          color: var(--button);
          font-size: 1.2rem;
          font-weight: 600;
        }
        .bike-detail-desc {
          color: var(--text);
          opacity: 0.9;
        }
        .bike-detail-emi {
          color: var(--button);
          font-weight: 500;
        }
        .bike-detail-offers ul {
          margin: 0.3rem 0 0 1.2rem;
          color: var(--text);
        }
        .bike-detail-quote {
          margin-top: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .bike-detail-quote input {
          padding: 0.7rem 1rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--background);
          color: var(--text);
          font-size: 1rem;
          outline: none;
        }
        .bike-detail-quote button {
          background: var(--button);
          color: var(--button-text);
          border: none;
          border-radius: 6px;
          padding: 0.7rem 1.2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 0.3rem;
        }
        .bike-detail-quote button:hover {
          background: var(--button-text);
          color: var(--button);
          border: 1px solid var(--button);
        }
        .bike-detail-sent {
          color: var(--button);
          font-size: 0.98rem;
          margin-top: 0.3rem;
        }
      `}</style>
    </div>
  );
}
