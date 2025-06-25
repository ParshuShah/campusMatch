const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { escape } = require("validator");

//NOt doing anything just experimenting the git push

const userAuth = async(req, res, next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(401).send("Please Login");
        }

        const decodeObj = await jwt.verify(token, "PARSHUK@123");

        const {_id} = decodeObj;

        const user = await User.findById(_id);

        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
}

module.exports = userAuth;











