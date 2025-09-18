const express = require("express");
const userController = require("../controllers/userController");
const { validateRegisterBody, validateLoginBody } = require("../middlewares/validateBody");

const router = express.Router();

router
  .route("/register")
  .post(validateRegisterBody, userController.registerUser);

router.post("/login", validateLoginBody, userController.loginUser);

module.exports = router;
