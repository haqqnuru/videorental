const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // find user
  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password.");

  // validate password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  // generate token
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET
  );

  res.send(token);
});

module.exports = router;
