import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
const port = Number(process.env.PORT || 18081);
const secret = process.env.JWT_SECRET || 'local-dev-secret';

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'auth-service' });
});

app.get('/ready', (_req, res) => {
  res.json({ status: 'ready', service: 'auth-service' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password123') {
    const token = jwt.sign({ sub: 'admin-1', role: 'ADMIN' }, secret, { expiresIn: '1h' });
    return res.json({ success: true, data: { token }, error: null });
  }

  if (username === 'customer' && password === 'password123') {
    const token = jwt.sign({ sub: 'customer-1', role: 'CUSTOMER' }, secret, { expiresIn: '1h' });
    return res.json({ success: true, data: { token }, error: null });
  }

  return res.status(401).json({ success: false, data: null, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' } });
});

app.listen(port, () => {
  console.log(`Auth Service listening on port ${port}`);
});
