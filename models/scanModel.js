const db = require("../config/db");

const Scan = {
  create: (patientName, patientId, scanType, region, imageUrl, callback) => {
    const uploadDate = new Date().toISOString();
    db.run(
      `INSERT INTO scans (patientName, patientId, scanType, region, imageUrl, uploadDate)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [patientName, patientId, scanType, region, imageUrl, uploadDate],
      function (err) {
        // Use function() not arrow fn to get this.lastID
        callback(err, { id: this.lastID });
      }
    );
  },
  getAllScans:(callback)=>{
        db.all(`SELECT * FROM scans`,[],callback);
    },
    // getScanByPatientId:(patientId,callback) => {
    //     db.get(`SELECT * FROM scans WHERE patientId='${patientId}'`,
    //         function(err,job){
    //             callback(err,job)
    //         }
    //     )
    // },
};

module.exports = Scan;
