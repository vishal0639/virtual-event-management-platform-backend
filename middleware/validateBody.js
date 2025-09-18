const validateLoginBody = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  try {
    const { username, password } = req.body;
    let errors = [];

    if (
      !username ||
      typeof username !== "string" ||
      username.trim() === "" ||
      !isNaN(username)
    ) {
      errors.push("username should be a non-empty string");
    } else if (username.trim().length > 50) {
      errors.push("username should not be greater than 50 characters");
    }

    if ((!password && typeof password !== "string") || password.trim() === "") {
      errors.push("password is required");
    } else if (password.length < 5) {
      errors.push("password length should be greater than 5");
    }

    if (errors.length) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors,
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const validateRegisterBody = (req, res, next) => {
  try {
    const { username, password } = req.body;
    let errors = [];

    // Username validation
    if (
      !username ||
      typeof username !== "string" ||
      username.trim() === "" ||
      !isNaN(username)
    ) {
      errors.push("username should be a non-empty string");
    } else if (username.trim().length > 50) {
      errors.push("username should not be greater than 50 characters");
    }

    // Password validation
    if ((!password && typeof password !== "string") || password.trim() === "") {
      errors.push("password is required");
    } else if (password.length < 5) {
      errors.push("password length should be greater than 5");
    }

    // Send validation errors
    if (errors.length) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors,
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  validateLoginBody,
  validateRegisterBody,
};
