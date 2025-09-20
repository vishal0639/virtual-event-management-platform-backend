const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Username is required'], 
    unique: true,
    lowercase: true,
    validate: {
      validator: function(username) {
        // Email validation regex (username must be email format)
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
      },
      message: 'Username must be a valid email address'
    }
  },
  password: { 
    type: String,
    required: [true, 'Password is required'],
    minlength: [5, 'Password must be at least 5 characters long']
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const User = mongoose.model("User", userSchema);

module.exports = User;
