import React from 'react';
import Form from '../common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import withRouter from '../common/withRouter';


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
  
componentDidMount() {
  //this gets the genres and update the state
  const genres = getGenres();
  this.setState({genres});

  //this gets the parameter in the route and stores in the movieId
  const movieId = this.props.params.id;
  if (movieId === 'new') return;

  //id not new, you get movie with a given id and if it does't exit it will redirect the user to not found
  const movie = getMovie(movieId);
  if (!movie) {
    // delay navigation until after render
    setTimeout(() => this.props.navigate('/notFound', { replace: true }));
    return;
  }

  this.setState({data: this.mapToViewModel(movie)});
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
  doSubmit = () => {
    // save the movie
    saveMovie(this.state.data);

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
export default withRouter(MovieForm);