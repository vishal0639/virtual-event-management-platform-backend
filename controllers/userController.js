const User = require("../models/userModel");
const { comparePassword, hashPassword } = require("../utils/auth");
const { createToken } = require("../utils/jwtUtils");

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

    const token = createToken(user._id);

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, username: user.username, token },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
