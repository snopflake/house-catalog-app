require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const designRoutes = require('./routes/designs');
const messagesRouter = require('./routes/messages');
const accessRouter = require('./routes/access');

app.use(cors());
app.use(express.json());

// Static folder untuk upload image
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/messages', messagesRouter);
app.use('/api/access', accessRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));