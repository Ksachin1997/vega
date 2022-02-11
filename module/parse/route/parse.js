const multer = require("multer");
const express = require("express");
const parseController = require("../controller/parseController");
const uploadMiddleware = require("../../../middleware/upload");
const router = express.Router();

router
  .use(uploadMiddleware.handleXlsxFile)
  .route("/addressFromFile")
  .post(parseController.parseAddresses)
  .get(parseController.sendAddressTemplates);

module.exports = router;
