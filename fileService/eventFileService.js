const fs = require("fs");
const path = require("path");

const EVENTS_FILE = path.join(__dirname, "../events.json");
console.log("Events DB path:", EVENTS_FILE);

const getEventsData = () => {
  try {
    const rawData = fs.readFileSync(EVENTS_FILE, "utf-8");
    const parsed = JSON.parse(rawData);

    // ✅ Make sure you return the `events` array
    return parsed.events || [];
  } catch (err) {
    console.error("Failed to read events.json:", err);
    return []; // fallback to empty array
  }
};

const saveEventsData = (events) => {
  try {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify({ events }, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write events.json:", err);
    throw err;
  }
};

module.exports = {
  getEventsData,
  saveEventsData,
};
