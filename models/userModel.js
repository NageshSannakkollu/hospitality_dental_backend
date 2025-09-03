const bcrypt = require("bcryptjs")
const db = require("../config/db")

const User = {
    create:async (email,password,role,callback) => {
        const hashedPassword = await bcrypt.hash(password,10)
        // console.log("HasPass:")
        db.run(
            `INSERT INTO user (email,password,role) VALUES ('${email}','${hashedPassword}','${role}')`,
            function(err){
                callback(err,{id:this.lastID})
            }
        )
    },
    getByEmail:(email,callback) => {
        // console.log("Email:",email)
        db.get(`SELECT * FROM user WHERE email='${email}'`,
        function (err,user){
            callback(err,user)  
        })
    },
};

module.exports = User;