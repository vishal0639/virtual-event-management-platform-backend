const { getUsersData } = require("../fileService/userFileService");
const User = require("../models/userModel");
const { comparePassword, hashPassword } = require("../utils/auth");
const { createToken } = require("../utils/jwtUtils");

const users = getUsersData();

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isExistingUser = users.find((user) => (user.name = username));
    if (isExistingUser) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }
    const hashedPassword = await hashPassword(password);

    const user = new User(username, hashedPassword);

    console.log(users, "users");

    users.push(user);

    fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find((user) => user.username == username);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = createToken(user.id);

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, username: user.username, token },
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
