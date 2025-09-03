const cloudinary = require("../config/cloudinary");
const Scan = require("../models/scanModel");

const uploadScan = async (req, res) => {
    // const {selectedFile} = req.file
    // console.log("selectedFile:",selectedFile)
  try {
    if (!req.file)
      return res.status(400).json({ error: "No image file provided" });

    // Upload image buffer to Cloudinary using upload_stream
    const cloudinaryResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const imageUrl = cloudinaryResult.secure_url;

    // Get patient details from req.body
    const { patientName, patientId, scanType, region } = req.body;

    Scan.create(
      patientName,
      patientId,
      scanType,
      region,
      imageUrl,
      (err, createdId) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Failed to upload scan", success: false });
        }
        return res.status(201).json({
          message: "Scan uploaded successfully!",
          imageUrl,
          ID: createdId,
          success: true,
        });
      }
    );
  } catch (error) {
    console.error("Upload scan error:", error);
    res.status(500).json({ error: "Failed to upload scan" });
  }
};

const getAllScansList = (req,res) => {
    // console.log("All users Request")    
    Scan.getAllScans((err,scans) => {
        if(err){
            return res.status(200).json({error:err.message,success:false})
        }
        res.status(200).json(scans)
    })
}

// const getScanBySpecificPatientId = (req,res) => {
//     const {patientId} = req.params;
//     // console.log(patientId)
//     Scan.getById(patientId,(err,scan)=> {
//         try {
//             return res.status(200).json(scan)
//         } catch (error) {
//             if(err){
//             return res.status(200).json({error:err.message,success:false})
//         }
//         if(scan === undefined){
//             return res.status(200).json({message:`Invalid Patient Id:${id}`,success:false})
//         }
//         }
        
//     })
// }

module.exports = {uploadScan,getAllScansList}
