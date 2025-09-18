const express = require("express");
const { config } = require("dotenv");
const userRoutes = require("./routes/userRoutes");
config();
const app = express();
app.use(express.json());

app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
