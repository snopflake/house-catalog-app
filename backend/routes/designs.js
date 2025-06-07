const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db');
const { verifyToken, isAdmin, isDesigner } = require('../middleware/auth');

// Setup multer (upload)
const storage = multer.diskStorage({
  destination: '/app/uploads', // gunakan path absolut di dalam container
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage, 
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.png') {
      return cb(new Error('Only .png files are allowed'), false);
    }
    cb(null, true);
  }
});

// Upload design (Admin & Designer)
router.post('/', verifyToken, isDesigner, upload.single('image'), (req, res) => {
  const { design_name, design_country, design_specialty } = req.body;
  const { filename } = req.file;
  const sql = 'INSERT INTO designs (design_name, design_country, design_specialty, file_path) VALUES (?, ?, ?, ?)';
  db.query(sql, [design_name, design_country, design_specialty, filename], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Database error', err });
    res.json({ msg: 'Design uploaded', filename });
  });
});

// Lihat semua design (Everyone)
router.get('/', verifyToken, (req, res) => {
  db.query('SELECT * FROM designs', (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', err });
    res.json(results);
  });
});

// Hapus design (Admin only)
router.delete('/:id', verifyToken, isAdmin, (req, res) => {
  const sql = 'DELETE FROM designs WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {    if (err) return res.status(500).json({ msg: 'Database error', err });
    res.json({ msg: 'Design deleted' });
  });
});

module.exports = router;
