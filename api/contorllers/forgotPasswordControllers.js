const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const validator = require("validator");

// function to encrypt password
const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
};

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "oghenerookerri@gmail.com",
    pass: "qmtedgblfmsjmysr",
  },
});
// reset request
const resetRequest = async (req, res) => {
  try {
    const { email } = req.body;

    // check if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    // check if email exist (registered)
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "email is not resgistered" });
    }

    // Generate a JWT token with the user's email
    const token = jwt.sign({ email }, process.env.JWT_SEC, {
      expiresIn: "35m",
    });

    // Send a Password reset email to the user
    const resetLink = `http://localhost:5174/user/reset-password/${token}`;

    // mail sending options
    const mailOptions = {
      from: "oghenerookerri@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `To reset your password, click on the following: ${resetLink}`,
      html: ` <div style="background-color: rgb(238, 237, 237); padding: 20px;"><p style="color: black; background-color: white; padding: 15px; line-height: 2.0; border-radius: 10px;">You are receiving this email because you requested a password change. To reset your password, click on the following link: ${resetLink}. This link expires in just 35-minutes</p></div>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message:
            "Failed to send reset email! This is unusual, Try again in few minutes",
        });
      } else {
        console.log(info);
        res.json({ message: "Reset email sent successfully" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
// reset password route
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    // verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SEC);

    if (!decoded) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = encryptPassword(password);

    const user = await User.findOne({ email: decoded.email });
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error! It seems your reset link has expired",
    });
  }
};

module.exports = {
  resetPassword,
  resetRequest,
};
