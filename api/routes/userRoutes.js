const express = require("express");
const router = express.Router();

const {
  loginPost,
  registerPost,
  contactUs,
  logout,
} = require("../contorllers/userControllers");

router.post("/login", loginPost);
router.post("/register", registerPost);
router.post("/contact", contactUs);
router.get("/logout", logout);

module.exports = router;
