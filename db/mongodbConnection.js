const mongoose = require("mongoose");
const { config } = require("dotenv");

config();

const uri = process.env.MONGODB_URI;

const connectTOMongoDB = () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB Atlas", err);
      console.log("Falling back to file-based storage");
      console.log(uri, "uri");
    });
};

module.exports = connectTOMongoDB;
