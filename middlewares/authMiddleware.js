const { verifyToken } = require("../utils/jwtUtils");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        message: "Access token required",
        code: "TOKEN_MISSING"
      });
    }

    const decoded = verifyToken(token);
    
    // Check if it's an access token
    if (decoded.type !== 'access') {
      return res.status(401).json({ 
        message: "Invalid token type",
        code: "INVALID_TOKEN_TYPE"
      });
    }

    req.user = decoded; // Add user info to request
    next();

  } catch (error) {
    console.log("Auth error:", error.message);
    
    // Handle different types of token errors
    if (error.message === "Invalid token") {
      return res.status(401).json({ 
        message: "Invalid access token",
        code: "INVALID_TOKEN"
      });
    }
    
    // JWT expired error
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: "Access token expired",
        code: "TOKEN_EXPIRED"
      });
    }

    return res.status(401).json({ 
      message: "Token verification failed",
      code: "TOKEN_VERIFICATION_FAILED"
    });
  }
};

// Optional middleware - only authenticate if token is provided
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // No token provided, continue without authentication
    req.user = null;
    return next();
  }

  // Token provided, verify it
  authenticateToken(req, res, next);
};

module.exports = {
  authenticateToken,
  optionalAuth
};
