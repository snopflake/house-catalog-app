const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db');
const { verifyToken, isAdmin, isDesigner } = require('../middleware/auth');

// Setup multer (upload) dengan path relatif yang benar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads')); // folder backend/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage, 
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.png') {
      return cb(new Error('Only .png files are allowed'), false);
    }
    cb(null, true);
  }
});

// Upload design (Admin & Designer)
router.post('/', verifyToken, isDesigner, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const { filename } = req.file;
  const sql = 'INSERT INTO designs (file_path) VALUES (?)';

  db.query(sql, [filename], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ msg: 'Database error', err });
    }

    res.json({ 
      msg: 'Design uploaded', 
      filename,
      id: result.insertId
    });
  });
});

// Lihat semua design (Everyone)
router.get('/', verifyToken, (req, res) => {
  db.query('SELECT * FROM designs', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ msg: 'Database error', err });
    }
    res.json(results);
  });
});

// Hapus design (Admin only)
router.delete('/:id', verifyToken, isAdmin, (req, res) => {
  const sql = 'DELETE FROM designs WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ msg: 'Database error', err });
    }
    res.json({ msg: 'Design deleted' });
  });
});

module.exports = router;
