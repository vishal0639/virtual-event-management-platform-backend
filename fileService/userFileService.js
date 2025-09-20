const fs = require("fs");
const path = require("path");

const USERS_FILE = path.join(__dirname, "../user.json");
console.log("in Memory DB path:", USERS_FILE);
// Note:readFileAsync and writeFileAsync is not working
const getUsersData = () => {
  try {
    const rawData = fs.readFileSync(USERS_FILE, "utf-8");
    const parsed = JSON.parse(rawData);

    // ✅ Make sure you return the `users` array
    return parsed.users || [];
  } catch (err) {
    console.error("Failed to read users.json:", err);
    return []; // fallback to empty array
  }
};

const saveUsersData = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write users.json:", err);
    throw err;
  }
};

module.exports = {
  getUsersData,
  saveUsersData,
};
