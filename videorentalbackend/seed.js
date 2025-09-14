const mongoose = require("mongoose");
const Movie = require("./models/Movie");
const Genre = require("./models/genre");

const seed = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/videorentalbackend");

  // Clear old data
  await Movie.deleteMany();
  await Genre.deleteMany();

  // Insert genres
  const genres = await Genre.insertMany([
    { name: "Action" },
    { name: "Comedy" },
    { name: "Thriller" },
    { name: "Romance" }
  ]);

  // Insert movies
  await Movie.insertMany([
    { title: "Terminator", genre: genres[0]._id, numberInStock: 6, dailyRentalRate: 2.5 },
    { title: "Die Hard", genre: genres[0]._id, numberInStock: 5, dailyRentalRate: 2.5 },
    { title: "Get Out", genre: genres[2]._id, numberInStock: 8, dailyRentalRate: 3.5 },
    { title: "Trip to Italy", genre: genres[1]._id, numberInStock: 7, dailyRentalRate: 3.5 },
    { title: "Airplane", genre: genres[1]._id, numberInStock: 7, dailyRentalRate: 3.5 },
    { title: "Wedding Crashers", genre: genres[1]._id, numberInStock: 7, dailyRentalRate: 3.5 },
    { title: "Gone Girl", genre: genres[2]._id, numberInStock: 7, dailyRentalRate: 4.5 },
    { title: "The Sixth Sense", genre: genres[2]._id, numberInStock: 4, dailyRentalRate: 3.5 },
    { title: "The Avengers", genre: genres[0]._id, numberInStock: 7, dailyRentalRate: 3.5 },
     { title: "The Notebook", genre: genres[3]._id,numberInStock: 5, dailyRentalRate: 2 },
      { title: "When Harry Met Sally", genre: genres[3]._id,numberInStock: 10, dailyRentalRate: 2 },
      { title: "Pretty Woman", genre: genres[3]._id,numberInStock: 15, dailyRentalRate: 2 }
  ]);

  console.log("Database seeded!");
  process.exit();
};

seed();
