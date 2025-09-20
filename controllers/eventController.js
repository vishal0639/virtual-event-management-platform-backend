const Event = require("../models/eventModel");
const User = require("../models/userModel");

// GET /events - Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('participants', 'username');
    res.status(200).json({
      message: "Events retrieved successfully",
      events: events,
      count: events.length
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST /events - Create new event
const createEvent = async (req, res) => {
  try {
    const { date, time, description, participants = [] } = req.body;

    // Create new event
    const event = new Event({
      date,
      time,
      description,
      participants
    });

    const savedEvent = await event.save();

    res.status(201).json({
      message: "Event created successfully",
      event: savedEvent
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

// GET /events/:id - Get single event
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate('participants', 'username');

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event retrieved successfully",
      event: event
    });
  } catch (error) {
    console.log("error", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid event ID format" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PUT /events/:id - Update event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, description, participants } = req.body;

    const event = await Event.findByIdAndUpdate(
      id,
      { date, time, description, participants },
      { new: true, runValidators: true }
    ).populate('participants', 'username');

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event: event
    });
  } catch (error) {
    console.log("error", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation Error",
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid event ID format" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE /events/:id - Delete event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event deleted successfully",
      event: event
    });
  } catch (error) {
    console.log("error", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid event ID format" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST /events/:id/register - Register user for event
const registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the event
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is already registered
    if (event.hasParticipant(userId)) {
      return res.status(409).json({ message: "User is already registered for this event" });
    }

    // Add user to participants using the schema method
    await event.addParticipant(userId);

    // Get updated event with populated participants
    const updatedEvent = await Event.findById(id).populate('participants', 'username');

    res.status(200).json({
      message: "Successfully registered for event",
      event: updatedEvent,
      registeredUser: { id: user._id, username: user.username }
    });
  } catch (error) {
    console.log("error", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
};
