const express = require("express");
const eventController = require("../controllers/eventController");
const { validateEventBody } = require("../middlewares/validateBody");
const { authenticateToken, optionalAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

// Public routes - no authentication required
// GET /events - Get all events (public)
router.get("/", optionalAuth, eventController.getAllEvents);

// GET /events/:id - Get single event (public)
router.get("/:id", optionalAuth, eventController.getEventById);

// Protected routes - authentication required
// POST /events - Create new event (auth required)
router.post("/", authenticateToken, validateEventBody, eventController.createEvent);

// PUT /events/:id - Update event (auth required)
router.put("/:id", authenticateToken, validateEventBody, eventController.updateEvent);

// DELETE /events/:id - Delete event (auth required)
router.delete("/:id", authenticateToken, eventController.deleteEvent);

// POST /events/:id/register - Register for event (auth required)
router.post("/:id/register", authenticateToken, eventController.registerForEvent);

module.exports = router;
