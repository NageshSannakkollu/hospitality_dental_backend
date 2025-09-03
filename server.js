const express = require("express")
const cors = require("cors")
const app = express()

const userRoutesDetails = require("./routes/userRoutes")
const scanRouteDetails =require("./routes/scanRoutes")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/",userRoutesDetails)
app.use("/",scanRouteDetails)


const port = 3035 || process.env.PORT;

app.listen(port,(() => {
    console.log(`Server Running at: http://localhost:${port}/`)
}))