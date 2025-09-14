const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
    required: true
  },
  numberInStock: { type: Number, min: 0, max: 255 },
  dailyRentalRate: { type: Number, min: 0, max: 255 },
  publishDate: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Movie || mongoose.model("Movie", movieSchema);
