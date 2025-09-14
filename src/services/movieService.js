import http from "./httpService";       
import { apiUrl } from "../config.json";

// Base endpoint for movies
const apiEndpoint = apiUrl + "/movies";

// Helper: build URL for a single movie
function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// GET all movies
export function getMovies() {
  return http.get(apiEndpoint);
}

//GET a single movie by ID
export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

// CREATE or UPDATE a movie
export function saveMovie(movie) {
  // If the movie has an _id, update it (PUT request)
  if (movie._id) {
    const body = { ...movie }; // make a copy
    delete body._id;           // remove _id (Mongo generates its own)
    return http.put(movieUrl(movie._id), body);
  }

  // Otherwise, create a new movie (POST request)
  return http.post(apiEndpoint, movie);
}

// DELETE a movie by ID
export function deleteMovie(movieId) {
return http.delete(movieUrl(movieId));
}
