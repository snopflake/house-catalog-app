const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET: Semua user (kecuali admin)
router.get('/users', verifyToken, isAdmin, (req, res) => {
  db.query('SELECT id, nama, email, role FROM users WHERE role != "admin"', (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', err });
    res.json(results);
  });
});

// PATCH: Update role user ke designer
router.patch('/users/:id/role', verifyToken, isAdmin, (req, res) => {
  const { role } = req.body;
  if (!['user', 'designer'].includes(role)) {
    return res.status(400).json({ msg: 'Role tidak valid' });
  }
  db.query('UPDATE users SET role = ? WHERE id = ?', [role, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Database error', err });
    res.json({ msg: 'Role updated' });
  });
});

module.exports = router;