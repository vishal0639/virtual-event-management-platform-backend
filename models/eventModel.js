const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  time: {
    type: String,
    required: [true, 'Event time is required'],
    validate: {
      validator: function(time) {
        // Validate time format (HH:MM or HH:MM AM/PM)
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](\s?(AM|PM))?$/i.test(time);
      },
      message: 'Please provide a valid time format (HH:MM or HH:MM AM/PM)'
    }
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Virtual to get participant count
eventSchema.virtual('participantCount').get(function() {
  return this.participants.length;
});

// Method to add participant
eventSchema.methods.addParticipant = function(userId) {
  // Convert userId to string for comparison
  const userIdStr = userId.toString();
  const alreadyParticipant = this.participants.some(id => id.toString() === userIdStr);
  
  if (!alreadyParticipant) {
    this.participants.push(userId);
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to remove participant
eventSchema.methods.removeParticipant = function(userId) {
  const userIdStr = userId.toString();
  this.participants = this.participants.filter(id => id.toString() !== userIdStr);
  return this.save();
};

// Method to check if user is participant
eventSchema.methods.hasParticipant = function(userId) {
  const userIdStr = userId.toString();
  return this.participants.some(id => id.toString() === userIdStr);
};

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;