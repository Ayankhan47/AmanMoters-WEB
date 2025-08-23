import React from "react";

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <h1 style={{ color: 'var(--text)', background: 'var(--card)', padding: '1rem 2rem', borderRadius: 8, border: '1px solid var(--border)' }}>
        Home
      </h1>
    </div>
  );
}
