const multer = require("multer");
const DatauriParser = require("datauri/parser");
const path = require("path");

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");

const dUri = new DatauriParser();

// Convert file buffer to data URI string
const dataUri = (req) =>
  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer)
    .content;

module.exports = { multerUploads, dataUri };
