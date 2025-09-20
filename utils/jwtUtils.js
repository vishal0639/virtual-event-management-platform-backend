const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const createToken = (userId, expiresIn = "15m") => {
  try {
    if (!userId || !secretKey) {
      throw new Error("User ID and secret key are required to create a token");
    }
    return jwt.sign({ userId, type: 'access' }, secretKey, { expiresIn });
  } catch (error) {
    throw new Error("Invalid input for token creation: " + error.message);
  }
};

const createRefreshToken = (userId, expiresIn = "7d") => {
  try {
    if (!userId || !secretKey) {
      throw new Error("User ID and secret key are required to create a refresh token");
    }
    return jwt.sign({ userId, type: 'refresh' }, secretKey, { expiresIn });
  } catch (error) {
    throw new Error("Invalid input for refresh token creation: " + error.message);
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    throw new Error("Failed to decode token");
  }
};

const refreshToken = (token, expiresIn = "4h") => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return jwt.sign({ userId: decoded.userId }, secretKey, { expiresIn });
  } catch (error) {
    throw new Error("Failed to refresh token: " + error.message);
  }
};

module.exports = {
  createToken,
  createRefreshToken,
  verifyToken,
  decodeToken,
  refreshToken,
};
