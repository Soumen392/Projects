import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

export const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // "Bearer <token>"
    if (!authHeader)
      return res.status(401).json({ success: false, message: 'Authorization header missing' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Token missing' });

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user (excluding password)
    const user = await userModel.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    req.user = user; // store user in request
    next(); // proceed to next middleware/controller
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};