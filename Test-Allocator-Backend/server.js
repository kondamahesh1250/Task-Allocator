require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');
app.use("/api",userRoutes);

const agentRoutes = require('./routes/agentRoutes');
app.use("/api",agentRoutes);

const listRoutes = require('./routes/listRoutes');
app.use("/api",listRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
