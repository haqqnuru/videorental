import React from 'react';
import Form from '../common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';
import { useNavigate, useParams } from "react-router-dom";


class MovieForm extends Form {
   state= {
       data: {
           title:'',
           genreId:'',
           numberInStock: '',
           dailyRentalRate: ''
       },
       genres: [],
       errors: { }
   }
   
   // schema for Joi
    schema = {
      _id: Joi.string(),
      title: Joi.string().required().label("Title"),
      genreId: Joi.string().required().label("Genre"),
      numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
      dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
     };


     // populates the genre
     async populateGenres() {
  //this gets the genres and update the state
  const {data:genres} = await getGenres();
  this.setState({genres});
     }

//populate the movies
      async populateMovies(){
try {  
    //this gets the parameter in the route and stores in the movieId
  const movieId = this.props.params.id;
  if (movieId === 'new') return;
    //id not new, you get movie with a given id and if it does't exit it will redirect the user to not found
    const {data:movie} = await getMovie(movieId);
  this.setState({data: this.mapToViewModel(movie)});
} 
  catch (ex) {
  if (ex.response && ex.response.status === 404) {
    this.props.navigate('/notFound', { replace: true });
  }
}
      }
  
async componentDidMount() {
 await this.populateGenres();
 await this.populateMovies();

  
}

// Maps a movie object from the service/backend to the format needed by the form.
// Converts the nested genre object into a genreId string and ensures the form's
// data state matches the structure expected by controlled inputs.
mapToViewModel(movie) {
  return {
    _id: movie._id,
    title: movie.title,
    genreId: movie.genre._id,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate
  };
}

//deals with the effects of submission
  doSubmit = async () => {
    // save the movie
   await saveMovie(this.state.data);

    // then redirect back to movies
    this.props.navigate("/movies");
  };
  
render() {
  return (

    <div className="container mt-5">
    <h1>Movie Form</h1>

{/* this handles all submit in the form */}
    <form onSubmit={this.handleSubmit}>

{/* shows title field */}
{this.renderInput("title", "Title")}

{/* shows genre fields */}
{this.renderSelect("genreId", "Genre", this.state.genres)}

{/* shows number in stock fields */}
{this.renderInput("numberInStock", "Number in Stock", "number")}

{/* shows rate fields */}
{this.renderInput("dailyRentalRate", "Rate", "number")}

{/* shows the button */}
{this.renderButton('Save')}
  
</form>
</div>

  );
}
}
// Wrapper for React Router v6
function MovieFormWrapper(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <MovieForm {...props} params={params} navigate={navigate} />;
}

export default MovieFormWrapper;


