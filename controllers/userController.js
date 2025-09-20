const User = require("../models/userModel");
const { comparePassword, hashPassword } = require("../utils/auth");
const { createToken, createRefreshToken, verifyToken } = require("../utils/jwtUtils");

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    
    const hashedPassword = await hashPassword(password);

    const user = new User({
      username: username,
      password: hashedPassword
    });

    const savedUser = await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        username: savedUser.username,
      },
    });
  } catch (error) {
    console.log("error", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation Error",
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = createToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, username: user.username },
      tokens: {
        accessToken,
        refreshToken,
        expiresIn: "15m" // Access token expires in 15 minutes
      }
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    // Verify the refresh token
    const decoded = verifyToken(refreshToken);

    // Check if it's actually a refresh token
    if (decoded.type !== 'refresh') {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Verify user still exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new access token
    const newAccessToken = createToken(decoded.userId);

    res.status(200).json({
      message: "Token refreshed successfully",
      tokens: {
        accessToken: newAccessToken,
        expiresIn: "15m"
      }
    });

  } catch (error) {
    console.log("error", error);
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
};
