const jwt = require('jsonwebtoken');
const { API_AUTH_USER, API_AUTH_PASS, JWT_SECRET } = process.env;

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

const login = (req, res) => {
  const { username, password } = req.body;
  
  if (username !== API_AUTH_USER || password !== API_AUTH_PASS) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { authenticate, login };