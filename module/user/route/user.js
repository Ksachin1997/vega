const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const { check } = require("express-validator");

router
  .route("/details")
  .get(userController.getUserDetails)
  .post(userController.saveUserDetails);

module.exports = router;
