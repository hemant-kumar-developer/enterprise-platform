import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => (
  <div style={{ padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
    <h2>Cart MFE</h2>
    <p>This remote microfrontend owns cart-related UI.</p>
    <ul>
      <li>Cart summary</li>
      <li>Quantity controls</li>
      <li>Checkout handoff</li>
    </ul>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
);
