import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const ProductRemote = lazy(() => import('product_mfe/ProductApp'));

const App = () => (
  <BrowserRouter>
    <div style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>Enterprise Platform Shell</h1>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Shell home. This is the host application.</div>} />
        <Route
          path="/products"
          element={
            <Suspense fallback={<div>Loading product MFE…</div>}>
              <ProductRemote />
            </Suspense>
          }
        />
        <Route path="/cart" element={<div>Cart MFE integration point.</div>} />
        <Route path="/orders" element={<div>Order MFE integration point.</div>} />
      </Routes>
    </div>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
);
