const jwt = require("jsonwebtoken");

const authenticateToken = async(req,res,next) => {
    const authHeaders = req.headers["authorization"]
    // console.log("authHeaders:",authHeaders)
    let jwtToken;
    if(authHeaders !== undefined){
         jwtToken = authHeaders.split(" ")[1]
        // console.log("token:",jwtToken)
        if(jwtToken === undefined){
            res.status(401).json({message:"Invalid JWT token"})
        }
        jwt.verify(jwtToken,`${process.env.JWT_SECRET}`,async(error,payload)=>{
            if(error){
                console.log("Error:","Error at verification")
                res.status(401).json({message:"Invalid JWT token"})
            }
            else{
                req.email = payload.email
                next();
            }
        })
    }
    
}

module.exports = authenticateToken;