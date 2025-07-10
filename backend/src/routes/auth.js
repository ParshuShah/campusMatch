const express = require("express");
const authRouter = express.Router();

const User = require("../models/User");
const { validateSignUpData } = require('../utils/validation')
const bcrypt = require("bcrypt");

//making an API to add the data into the DB.
authRouter.post("/signup", async (req, res) => {

  try {
    //validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash)

    //Creating a new Instance of the User Model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });


    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,           // IMPORTANT for HTTPS
      sameSite: "None",       // IMPORTANT for cross-origin
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//Login API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //second emailId is the email by req.body means by the user;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invaid Credentials");
    }
    //user.password is the encrypt password inside the db
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {

      //create a JWT token
      const token = await user.getJWT();
      //Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + 8 * 3600000), // optional
      });
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }

  } catch (err) {
    res.status(400).send("ERROR : " + err.message)
  }
})
//Logout API
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
});

module.exports = authRouter;
