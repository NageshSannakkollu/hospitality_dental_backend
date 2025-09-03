const express = require("express");
const { multerUploads } = require("../middleware/multer");
const {uploadScan, getAllScansList} = require("../controllers/scanController");
const router = express.Router();

router.post("/api/upload", multerUploads, uploadScan);
router.get("/api/scans",getAllScansList)
// router.get("/api/scan/:patientId",getScanBySpecificPatientId)

module.exports = router;