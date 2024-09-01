const express = require("express");
const router = express.Router();

const {
  resetPassword,
  resetRequest,
} = require("../contorllers/forgotPasswordControllers");

router.post("/request-reset", resetRequest);
router.post("/reset-password", resetPassword);

module.exports = router;
