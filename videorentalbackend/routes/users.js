const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.post("/", async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // hash password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();
    res.send(user);
} catch (err) {

    // handles duplicate registration for mangodb
  if (err.code === 11000) {
    console.warn("Duplicate email attempted:", req.body.email);
    return res.status(400).send("User already registered.");
  }

  console.error("Unexpected error saving user:", err.message);
  res.status(500).send("Something failed on the server.");
}
});

module.exports = router;
