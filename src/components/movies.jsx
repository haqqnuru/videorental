import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Like from '../common/like';
import Pagination from '../common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from '../common/listGroup';
import { getGenres } from '../services/fakeGenreService';


class Movies extends Component {
    state = { 
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: []
     };

     // this is called when an instance of the component is rendered in the dom
componentDidMount() {
    // adds 'All Genres' at the top of the listGroup
  const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
  this.setState({ movies: getMovies(), genres });
}

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
};

// handles the selected genre
handleGenreSelect = (genre) => {
    // it also resets current page to 1 whenever we go to all genres
    this.setState( { selectedGenre: genre, currentPage: 1});
}

    render() { 
//this renames the length to count of the movies
        const {length: count} = this.state.movies
        const {pageSize, currentPage, selectedGenre, movies: allMovies} = this.state;
        
        // if the length is 0, then display 0 or this play the number of movies
        if (count === 0)  return (
        <p>There are no movies in the database.</p>)

        // filtering and must come before pagination
        const filtered = selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
        : allMovies;

        //call paginate function
        // we removed the allMovies below and added filtered in place for the list group 
        const movies = paginate(filtered, currentPage, pageSize);

        return (
            
           
           <div className='row'> 
            {/* note the two columns  */}

           <div className="col-3">
            <ListGroup 
            items={this.state.genres}
            selectedItem={this.state.selectedGenre} 
            onItemSelect= {this.handleGenreSelect}
             textProperty="name"
            valueProperty="_id"
            />
           </div>
          
          
           <div className="col">
            {/* displays number of movies */}
             <p>Showing {filtered.length} movies in the database.</p>
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
            //  we remove count and change to filtered.length
             itemsCount={filtered.length} 
             pageSize={pageSize}
             onPageChange={this.handlePageChange}
             currentPage ={currentPage}/>
           </div>
          
       </div> );
    }
}
 
export default Movies;