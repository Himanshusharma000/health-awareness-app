const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');
const seedDatabase = require('./seed');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/healthDB')
  .then(async () => {
    console.log('Connected to MongoDB');
    // Seed Sample Data
    await seedDatabase();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
