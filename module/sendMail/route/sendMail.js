const express = require("express");
const router = express.Router();
const sendMail = require("../controller/sendMail")

router.route("/sendMail").post(sendMail.sendMail)

module.exports = router