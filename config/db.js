const sqlite3 = require("sqlite3");
const path = require("path")
const dbPath = path.join(__dirname,"database.db");

let db = new sqlite3.Database(dbPath,(err) => {
    if(err){
        console.log(`DB Connection Error:${err.message}`)
    }else{
        console.log(`DB Connected Successfully!`)
    }
});

const createUserTable = `
CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN ('Technician', 'Dentist')) NOT NULL
    )`;


const createScansTable = `
CREATE TABLE IF NOT EXISTS scans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patientName TEXT NOT NULL,
    patientId TEXT NOT NULL,
    scanType TEXT NOT NULL,
    region TEXT NOT NULL,
    imageUrl TEXT,
    uploadDate DATE NOT NULL
)`;

db.run(createUserTable, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('User Table created successfully');
});

db.run(createScansTable, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('Scan Table created successfully');
});

module.exports =  db;