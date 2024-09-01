const validator = require("validator");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const nodemailer = require("nodemailer");

// function to encrypt password
const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
};

const decryptPassword = (password) => {
  return CryptoJS.AES.decrypt(password, process.env.PASS_SEC).toString(
    CryptoJS.enc.Utf8
  );
};

const loginPost = async (req, res) => {
  // get email and password from form
  try {
    // get email and password from 'form'
    const { email, password } = req.body;

    // check if all fields are filled
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if email exist in database
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "email is not registered" });
    }

    // go to database and decrypt the encrypted password
    const decryptedPassword = decryptPassword(user.password);

    // check is the decrypt password is the same as the password typed in the form
    const isPasswordCorrect = decryptedPassword === password;
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "wrong credentials" });
    }

    // create token using jwt
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "1d" }
    );

    // extract password from user before sending response
    const { password: userPassword, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

const registerPost = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // check if all fields are filled
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    // check if email is existing
    const emailIsExisting = await User.findOne({ email: email });
    if (emailIsExisting) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // create a new user
    const newUser = new User({
      username: username,
      email: email,
      password: encryptPassword(password),
    });

    // save user
    const savedUser = await newUser.save();
    // response to client side
    res.status(200).json(savedUser);
  } catch (err) {
    console.error("Error in registration:", err);
    res.status(500).json({ message: "Failed to register user" });
  }
};

const contactUs = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "oghenerookerri@gmail.com",
        pass: "qmtedgblfmsjmysr",
      },
    });

    const mailOptions = {
      from: req.body.email,
      to: "oghenerookerri@gmail.com",
      subject: `Message from ${req.body.email}: ${req.body.subject}`,
      text: req.body.message,
      html: `<h3 style="color:green;">My name is: ${req.body.name}</h3><p>${req.body.message}</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "Failed to send email!",
        });
      } else {
        console.log(info.response);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  res.send("logout page");
};

module.exports = {
  loginPost,
  registerPost,
  contactUs,
  logout,
};
