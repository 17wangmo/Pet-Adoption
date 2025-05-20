import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function getTokenData(request) {
  const token = request.cookies.get('token');
  if (!token) return null;
  
  return verifyToken(token.value);
}

export async function authenticate(request) {
  const userData = getTokenData(request);
  
  if (!userData) {
    throw new Error('Not authenticated');
  }
  
  return userData;
} 