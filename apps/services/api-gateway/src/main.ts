import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { randomUUID } from 'crypto';

const app = express();
const port = Number(process.env.PORT || 18080);
const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:18081';
const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:18082';

app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use((req, _res, next) => {
  req.headers['x-request-id'] = req.headers['x-request-id'] || randomUUID();
  next();
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'api-gateway', requestId: randomUUID() });
});

app.get('/ready', (_req, res) => {
  res.json({ status: 'ready', service: 'api-gateway' });
});

app.post('/api/auth/login', async (req, res) => {
  const response = await fetch(`${authServiceUrl}/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(req.body),
  });
  const payload = await response.json();
  res.status(response.status).json({
    success: payload.success,
    data: payload.data,
    error: payload.error,
    requestId: req.headers['x-request-id'],
  });
});

app.get('/api/products', async (_req, res) => {
  const response = await fetch(`${productServiceUrl}/products`);
  const payload = await response.json();
  res.json({
    success: true,
    data: payload.data,
    error: null,
    requestId: _req.headers['x-request-id'],
  });
});

app.get('/api/products/:id', async (req, res) => {
  const response = await fetch(`${productServiceUrl}/products/${req.params.id}`);
  const payload = await response.json();
  res.status(response.status).json({
    success: payload.success,
    data: payload.data,
    error: payload.error,
    requestId: req.headers['x-request-id'],
  });
});

app.post('/api/orders', (req, res) => {
  res.status(201).json({
    success: true,
    data: { id: 'order-1001', status: 'CREATED', items: req.body.items || [] },
    error: null,
    requestId: req.headers['x-request-id'],
  });
});

app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
