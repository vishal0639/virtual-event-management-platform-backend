const { getEventsData, saveEventsData } = require("../fileService/eventFileService");
const { getUsersData } = require("../fileService/userFileService");
const Event = require("../models/eventModel");

const events = getEventsData();

// GET /events - Get all events
const getAllEvents = (req, res) => {
  try {
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
const createEvent = (req, res) => {
  try {
    const { date, time, description, participants = [] } = req.body;

    // Validate required fields
    if (!date || !time || !description) {
      return res.status(400).json({
        message: "Date, time, and description are required fields"
      });
    }

    // Create new event
    const event = new Event(date, time, description, participants);
    events.push(event);

    // Save to file
    saveEventsData(events);

    res.status(201).json({
      message: "Event created successfully",
      event: event.toJSON()
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET /events/:id - Get single event
const getEventById = (req, res) => {
  try {
    const { id } = req.params;
    const event = events.find(event => event.id === id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event retrieved successfully",
      event: event
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PUT /events/:id - Update event
const updateEvent = (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, description, participants } = req.body;

    const eventIndex = events.findIndex(event => event.id === id);

    if (eventIndex === -1) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update event fields
    if (date !== undefined) events[eventIndex].date = date;
    if (time !== undefined) events[eventIndex].time = time;
    if (description !== undefined) events[eventIndex].description = description;
    if (participants !== undefined) events[eventIndex].participants = participants;

    // Save to file
    saveEventsData(events);

    res.status(200).json({
      message: "Event updated successfully",
      event: events[eventIndex]
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE /events/:id - Delete event
const deleteEvent = (req, res) => {
  try {
    const { id } = req.params;
    const eventIndex = events.findIndex(event => event.id === id);

    if (eventIndex === -1) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Remove event from array
    const deletedEvent = events.splice(eventIndex, 1)[0];

    // Save to file
    saveEventsData(events);

    res.status(200).json({
      message: "Event deleted successfully",
      event: deletedEvent
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST /events/:id/register - Register user for event
const registerForEvent = (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the event
    const eventIndex = events.findIndex(event => event.id === id);
    if (eventIndex === -1) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Verify user exists
    const users = getUsersData();
    const user = users.find(user => user.id === userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is already registered
    if (events[eventIndex].participants.includes(userId)) {
      return res.status(409).json({ message: "User is already registered for this event" });
    }

    // Add user to participants
    events[eventIndex].participants.push(userId);

    // Save to file
    saveEventsData(events);

    res.status(200).json({
      message: "Successfully registered for event",
      event: events[eventIndex],
      registeredUser: { id: user.id, username: user.username }
    });
  } catch (error) {
    console.log("error", error);
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
