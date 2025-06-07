const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, isAdmin, isDesigner } = require('../middleware/auth');

// POST: Kirim pesan (user & designer)
router.post('/', verifyToken, (req, res) => {
  const { messages } = req.body;
  const sender_id = req.user.id;
  if (!messages) return res.status(400).json({ msg: 'Message required' });
  db.query(
    'INSERT INTO messages (messages, sender_id) VALUES (?, ?)',
    [messages, sender_id],
    (err, result) => {
      if (err) return res.status(500).json({ msg: 'Database error', err });
      res.json({ msg: 'Message sent', id: result.insertId });
    }
  );
});

// GET: Lihat pesan milik sendiri (user & designer)
router.get('/', verifyToken, (req, res) => {
  db.query(
    'SELECT * FROM messages WHERE sender_id = ? ORDER BY created_at DESC',
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ msg: 'Database error', err });
      res.json(results);
    }
  );
});

// PATCH: Admin membalas pesan (edit reply)
router.patch('/:id/reply', verifyToken, isAdmin, (req, res) => {
  const { reply } = req.body;
  db.query(
    'UPDATE messages SET reply = ? WHERE id = ?',
    [reply, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ msg: 'Database error', err });
      res.json({ msg: 'Reply updated' });
    }
  );
});

// DELETE: Admin hapus pesan
router.delete('/:id', verifyToken, isAdmin, (req, res) => {
  db.query('DELETE FROM messages WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Database error', err });
    res.json({ msg: 'Message deleted' });
  });
});

// GET: Admin melihat semua pesan
router.get('/all', verifyToken, isAdmin, (req, res) => {
  db.query('SELECT m.*, u.email AS sender_email FROM messages m JOIN users u ON m.sender_id = u.id ORDER BY m.created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', err });
    res.json(results);
  });
});

module.exports = router;