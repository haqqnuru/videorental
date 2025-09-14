const express = require("express");
const router = express.Router();
const Genre = require("../models/Genre");

// Get all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Add a new genre
router.post("/", async (req, res) => {
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

module.exports = router;
