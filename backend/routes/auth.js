const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Register
router.post('/register', async (req, res) => {
  const { email, nama, password, role } = req.body; // Sesuaikan dengan frontend
  if (!email || !nama || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Cek apakah user sudah ada berdasarkan email
  const checkUserSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserSql, [email], async (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', err });
    if (results.length > 0) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = 'INSERT INTO users (email, nama, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [email, nama, hashedPassword, role || 'user'], (err, result) => {
      if (err) {
        return res.status(500).json({ msg: 'Database error', err });
      }
      res.status(201).json({ msg: 'User registered!' });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body; // gunakan email bukan username

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', err });
    if (results.length === 0) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const user = results[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Create token
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email, nama: user.nama },
      process.env.JWT_SECRET || 'supersecretkey',
      { expiresIn: 3600 }
    );

    res.json({ token, user: { id: user.id, email: user.email, nama: user.nama, role: user.role } });
  });
});

module.exports = router;
