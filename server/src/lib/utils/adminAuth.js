
import jwt from 'jsonwebtoken'

async function decodeToken(token) {
  const arr = token.split(' ');

  try {
    
    if (arr[0] === 'at') {
      return jwt.verify(arr[1], 'ADMIN_SECRET');
    }
  
    throw new Error('Please Re-Sign In')
  } catch (error) {
    printError(error)
    throw error
  }
}

export default async function adminAuth(req, res, next) {
  
  try {

    const token = req.headers.a_auth;
    
    if (token != null) {
      const admin = await decodeToken(token);
      req.admin = admin;
    } else {
      req.admin = null;
    }
    return next(); 
  } catch (error) {
    req.admin = null;
    return next(); 
  }
}
