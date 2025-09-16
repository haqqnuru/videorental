
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {              
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true // prevents duplicate usernames
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
