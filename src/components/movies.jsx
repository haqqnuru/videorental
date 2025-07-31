import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';


class Movies extends Component {
    state = { 
        movies: getMovies()
     };

     //deletes a movie
handleDelete = (movie) => {
    // this gets and displays all movies except the choosen movie.
   const movies = this.state.movies.filter(m => m._id !== movie._id);
// sets movies property to movies object.
   this.setState({movies});
}

    render() { 

        const {length: count} = this.state.movies
        // if the length is 0, then display 0 or this play the number of movies
        if (count === 0)  return (
        <p>There are no movies in the database.</p>)
        return (
           <> <p>Showing {count} movies in the database.</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                    </tr>
                </thead>
            <tbody>
                {/* this list the movies */}
                {this.state.movies.map(movie => (<tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                </tr> ))}
               
            </tbody>
             </table>
       </> );
    }
}
 
export default Movies;