const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const designRoutes = require('./routes/designs');

app.use(cors());
app.use(express.json());

// Static folder untuk upload image
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/designs', designRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));

