import { verifyAccessToken } from '../utils/jwt.js';

export const auth = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  try {
    req.user = verifyAccessToken(bearer.split(' ')[1]);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const allowRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};
