const validateLoginBody = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  try {
    const { username, password } = req.body;
    let errors = [];

    // Username (email) validation
    if (!username || typeof username !== "string" || username.trim() === "") {
      errors.push("username is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username.trim())) {
      errors.push("username must be a valid email address");
    }

    // Password validation
    if ((!password && typeof password !== "string") || password.trim() === "") {
      errors.push("password is required");
    } else if (password.length < 5) {
      errors.push("password must be at least 5 characters long");
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

    // Username (email) validation
    if (!username || typeof username !== "string" || username.trim() === "") {
      errors.push("username is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username.trim())) {
      errors.push("username must be a valid email address");
    }

    // Password validation
    if ((!password && typeof password !== "string") || password.trim() === "") {
      errors.push("password is required");
    } else if (password.length < 5) {
      errors.push("password must be at least 5 characters long");
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

const validateEventBody = (req, res, next) => {
  try {
    const { date, time, description } = req.body;
    let errors = [];

    // Date validation
    if (!date) {
      errors.push("date is required");
    } else if (isNaN(Date.parse(date))) {
      errors.push("please provide a valid date");
    }

    // Time validation
    if (!time) {
      errors.push("time is required");
    } else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](\s?(AM|PM))?$/i.test(time)) {
      errors.push("please provide a valid time format (HH:MM or HH:MM AM/PM)");
    }

    // Description validation
    if (!description || typeof description !== "string" || description.trim() === "") {
      errors.push("description is required");
    } else if (description.length > 500) {
      errors.push("description cannot exceed 500 characters");
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
  validateEventBody,
};
