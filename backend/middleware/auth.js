const jwt = require('jsonwebtoken');

// Verifikasi token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'jwtSecretKey'); // ganti pake env
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

// Role check
function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied: Admins only' });
  }
  next();
}

function isDesigner(req, res, next) {
  if (req.user.role !== 'designer' && req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied: Designers only' });
  }
  next();
}

function isUser(req, res, next) {
  if (req.user.role !== 'user' && req.user.role !== 'designer' && req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied: Users only' });
  }
  next();
}

module.exports = { verifyToken, isAdmin, isDesigner, isUser };
