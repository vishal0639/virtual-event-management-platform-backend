const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

const createToken = (userId, expiresIn = "1h") => {
  try {
    if (!userId || !secretKey) {
      throw new Error("User ID and secret key are required to create a token");
    }
    return jwt.sign({ userId }, secretKey, { expiresIn });
  } catch (error) {
    throw new Error("Invalid input for token creation: " + error.message);
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

const refreshToken = (token, expiresIn = "1h") => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return jwt.sign({ userId: decoded.userId }, secretKey, { expiresIn });
  } catch (error) {
    throw new Error("Failed to refresh token: " + error.message);
  }
};

module.exports = {
  createToken,
  verifyToken,
  decodeToken,
  refreshToken,
};
