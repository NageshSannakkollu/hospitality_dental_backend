const express = require('express')
const {userRegistration,loginUser} = require("../controllers/userController")
//const authenticateToken = require("../middleware/authMiddleware")


const router = express.Router()
router.post("/api/auth/signup",userRegistration)
router.post("/api/auth/login",loginUser)

module.exports =router