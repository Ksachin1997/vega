const multer = require("multer");

exports.handleXlsxFile = (req, res, next) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: {
      fieldNameSize: 100, // 100B
      fieldSize: 1 * 1000, // 1KB
      fields: 0,
      fileSize: 10 * 1000 * 1000, // 10MB
      files: 1,
      parts: 1,
    },
    fileFilter: (req, file, callback) => {
      if (
        ["xls", "xlsx"].indexOf(
          file.originalname.split(".")[file.originalname.split(".").length - 1]
        ) === -1
      ) {
        return callback(new Error("Wrong file type"));
      }
      callback(null, true);
    },
  });

  const uploadFile = upload.single("file");

  uploadFile(req, res, function (err) {
    if (err) {
      return res
        .status(200)
        .send({ status: false, data: {}, message: "Invalid file type" });
    }
    next();
  });
};
