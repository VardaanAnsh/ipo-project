// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ipoRoutes = require('./routes/ipoRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // your frontend port
  credentials: true,
}));

app.use('/api/ipos', ipoRoutes);

app.get('/', (req, res) => {
  res.send('IPO API Running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
