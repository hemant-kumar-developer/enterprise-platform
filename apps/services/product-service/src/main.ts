import express from 'express';

const app = express();
const port = Number(process.env.PORT || 18082);

app.use(express.json());

const products = [
  { id: 'prod-1', name: 'Laptop', price: 999, description: 'Developer laptop', stock: 12 },
  { id: 'prod-2', name: 'Monitor', price: 249, description: '4K monitor', stock: 8 },
];

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'product-service' });
});

app.get('/ready', (_req, res) => {
  res.json({ status: 'ready', service: 'product-service' });
});

app.get('/products', (_req, res) => {
  res.json({ success: true, data: products, error: null });
});

app.get('/products/:id', (req, res) => {
  const product = products.find((item) => item.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, data: null, error: { code: 'PRODUCT_NOT_FOUND', message: 'Product not found' } });
  }
  return res.json({ success: true, data: product, error: null });
});

app.listen(port, () => {
  console.log(`Product Service listening on port ${port}`);
});
