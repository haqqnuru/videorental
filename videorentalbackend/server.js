const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const genres = require("./routes/genres");
const movies = require("./routes/movies");
const users = require("./routes/users");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/users", users);


// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
