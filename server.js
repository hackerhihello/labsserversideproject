const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerDocs = require('./swagger'); // Import Swagger configuration

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

// Import Routes
const userRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');

// Use Routes
app.use('/api/auth', userRoutes);
app.use('/api/rooms', roomRoutes);

// Set up Swagger documentation
swaggerDocs(app);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
