import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Like from '../common/like';
import Pagination from '../common/pagination';
import { paginate } from '../utils/paginate';


class Movies extends Component {
    state = { 
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1
     };

     //deletes a movie
handleDelete = (movie) => {
    // this gets and displays all movies except the choosen movie.
   const movies = this.state.movies.filter(m => m._id !== movie._id);
// sets movies property to movies object.
   this.setState({movies});
}


//handles like
handleLike = (movie) => {
 // ... clones all the properties of the counters State
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
       movies[index].liked = !movies[index].liked;
        this.setState({movies})
}

//handles page change
handlePageChange = (page) => {
this.setState({currentPage: page})
}

    render() { 

        const {length: count} = this.state.movies
        const {pageSize, currentPage, movies: allMovies} = this.state;
        // if the length is 0, then display 0 or this play the number of movies
        if (count === 0)  return (
        <p>There are no movies in the database.</p>)

        //call paginate function
        const movies = paginate(allMovies, currentPage, pageSize);

        return (
           <> <p>Showing {count} movies in the database.</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th>Likes</th>
                        <th></th>
                    </tr>
                </thead>
            <tbody>
                {/* this list the movies */}
                {movies.map(movie => (<tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><Like liked ={movie.liked} onClick={() => this.handleLike(movie)}/></td>
                    <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
               
                </tr> ))}
               
            </tbody>
             </table>
             <Pagination 
             itemsCount={count} 
             pageSize={pageSize}
             onPageChange={this.handlePageChange}
             currentPage ={currentPage}/>
       </> );
    }
}
 
export default Movies;