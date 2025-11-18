const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// GET all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find().populate("genre", "name").sort("title");
  res.send(movies);
});

// GET movie by ID
router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Invalid movie ID.");
  }

  const movie = await Movie.findById(req.params.id).populate("genre", "name");
  if (!movie) return res.status(404).send("Movie not found.");
  res.send(movie);
});

// ADD a new movie (auth required)
router.post("/", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.genreId)) {
    return res.status(400).send("Invalid genre ID.");
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Genre not found.");

  let movie = new Movie({
    title: req.body.title,
    genre: genre._id,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie = await movie.save();
  res.send(movie);
});

// UPDATE movie by ID (auth required)
router.put("/:id", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Invalid movie ID.");
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.genreId)) {
    return res.status(400).send("Invalid genre ID.");
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Genre not found.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: genre._id,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true } // return updated doc
  );

  if (!movie) return res.status(404).send("Movie not found.");
  res.send(movie);
});

// DELETE movie by ID (auth + admin required)
router.delete("/:id", [auth, admin], async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Invalid movie ID.");
  }

  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) return res.status(404).send("Movie not found.");

  res.send(movie);
});

module.exports = router;
