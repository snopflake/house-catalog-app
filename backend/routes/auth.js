const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  const { email, nama, password, role } = req.body;
  if (!email || !password || !nama) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const sql = 'INSERT INTO users (email, nama, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [email, nama, hashedPassword, role || 'user'], (err, result) => {
    if (err) {
      return res.status(500).json({ msg: 'User already exists or database error', error: err });
    }
    res.status(201).json({ msg: 'User registered!' });
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', err });
    if (results.length === 0) {
      return res.status(400).json({ msg: 'User not found' });
    }
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        nama: user.nama,
        role: user.role
      }
    });
  });
});

// Profile (letakkan di luar login!)
router.get('/profile', verifyToken, (req, res) => {
  db.query('SELECT id, email, nama, role FROM users WHERE id = ?', [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', err });
    if (results.length === 0) return res.status(404).json({ msg: 'User not found' });
    res.json(results[0]);
  });
});

module.exports = router;