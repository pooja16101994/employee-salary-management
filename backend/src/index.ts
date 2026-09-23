import express from 'express';
import cors from 'cors';
import { initDb } from './db.js';
import { getSalarySummary, listEmployees } from './employeeService.js';
import { seedEmployees } from './seed.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

initDb();
seedEmployees();

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/employees', (req, res) => {
  const { country, department, role, search, limit = '50', offset = '0' } = req.query;

  const result = listEmployees({
    country: typeof country === 'string' ? country : undefined,
    department: typeof department === 'string' ? department : undefined,
    role: typeof role === 'string' ? role : undefined,
    search: typeof search === 'string' ? search : undefined,
    limit: Number(limit),
    offset: Number(offset),
  });

  res.json(result);
});

app.get('/api/salary-summary', (_, res) => {
  res.json(getSalarySummary());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
