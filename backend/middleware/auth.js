const jwt = require('jsonwebtoken');

// Verifikasi token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });

  // Ambil token setelah 'Bearer '
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
