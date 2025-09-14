const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 }
});

module.exports = mongoose.models.Genre || mongoose.model("Genre", genreSchema);
