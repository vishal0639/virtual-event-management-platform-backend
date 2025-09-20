const express = require("express");
const eventController = require("../controllers/eventController");
// const { validateEventBody } = require("../middlewares/validateBody");

const router = express.Router();

// GET /events - Get all events
router.get("/", eventController.getAllEvents);

// POST /events - Create new event
router.post("/", eventController.createEvent);

// GET /events/:id - Get single event
router.get("/:id", eventController.getEventById);

// PUT /events/:id - Update event
router.put("/:id", eventController.updateEvent);

// DELETE /events/:id - Delete event
router.delete("/:id", eventController.deleteEvent);

// POST /events/:id/register - Register for event
router.post("/:id/register", eventController.registerForEvent);

module.exports = router;
