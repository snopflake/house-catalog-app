const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Register
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
  db.query(sql, [username, hashedPassword, role || 'user'], (err, result) => {
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
    if (err) throw err;
    if (results.length === 0) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const user = results[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Create token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      'jwtSecretKey',   // Ganti dengan secret yang lebih aman di env var nanti
      { expiresIn: 3600 }  // 1 hour
    );

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  });
});

module.exports = router;
