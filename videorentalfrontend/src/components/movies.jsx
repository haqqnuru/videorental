import React, { Component } from 'react';
import _ from 'lodash';
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom';

import Pagination from '../common/pagination';
import ListGroup from '../common/listGroup';
import MoviesTable from './moviesTable';
import SearchBox from './searchBox';

import { paginate } from '../utils/paginate';
import { getGenres } from '../services/genreService';
import {getMovies, deleteMovie } from '../services/movieService';






class Movies extends Component {
    state = { 
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        searchQuery: "",
        selectedGenre: null,
        sortColumn: {path: 'title', order: 'asc'}
     };

     // this is called when an instance of the component is rendered in the dom
async componentDidMount() {
    // adds 'All Genres' at the top of the listGroup
    const {data} = await getGenres();
  const genres = [{ _id: "", name: "All Genres" }, ...data];

  //rename data below to movies
  const {data: movies} = await getMovies();
  this.setState({ 
    movies, 
    genres, 
    selectedGenre: genres[0], // Select "All Genres" by default and makes it active
    currentPage: 1, // ⬅ force first page
  sortColumn: { path: "title", order: "asc" } // ⬅ force alphabetical
  });
}

     //deletes a movie
handleDelete = async movie => {
const originalMovies = this.state.movies;
    // this gets and displays all movies except the choosen movie.
   const movies = originalMovies.filter(m => m._id !== movie._id);
// sets movies property to movies object.
   this.setState({ movies, currentPage: 1 });

   try {
   await deleteMovie(movie._id);
}
catch (ex) {
    if (ex.response && ex.response.status === 404)
toast.error('This movie has already been deleted.')
    this.setState({movies: originalMovies});
}
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
    this.setState( { selectedGenre: genre, searchQuery: "", currentPage: 1});
}

// handles search
//selectedgenre was reset and current page too
handleSearch = (query) => {
    this.setState({searchQuery: query, selectedGenre:null, currentPage: 1})
}

// this handles sorting of the tables
handleSort = (sortColumn) => {
this.setState ({ sortColumn})
}

// all the logic in filtering, sorting and pagination put together
getPagedData = () => {

    const {
            pageSize, 
            currentPage, 
            selectedGenre,
            searchQuery, 
            movies: allMovies,
            sortColumn
        } = this.state;

        let filtered = allMovies;
        //for search query
        if (searchQuery)
            filtered = allMovies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()));

     // filtering and must come before pagination
      else if (selectedGenre && selectedGenre._id)
          filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

        //sorting is after filtering data
        // lodash is used and note that it has three arguments
        // Always force title ascending unless user sorts manually
    const sorted = _.orderBy(
  filtered,
  [
    (movie) =>
      sortColumn.path === "title"
        ? movie.title.toLowerCase() // force case-insensitive title sort
        : _.get(movie, sortColumn.path)
  ],
  [sortColumn.order]
);

        //call paginate function
        // we removed the filtered below and added sorted in place for the list group 
        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies};
}

    render() { 
//this renames the length to count of the movies
        const {length: count} = this.state.movies
        const {
            pageSize, 
            currentPage, 
            sortColumn,
            searchQuery
        } = this.state;
        const {user} = this.props;
        
        // if the length is 0, then display 0 or this play the number of movies
        if (count === 0)  return (
        <p>There are no movies in the database.</p>)


        const {totalCount, data: movies} = this.getPagedData();


        return (
            
           
           <div className='row'> 
            {/* note the two columns, was use to create a grid layout */}

           <div className="col-3">
           <ListGroup 
      items={this.state.genres}
      selectedItem={this.state.selectedGenre} // This controls active highlight
      onItemSelect={this.handleGenreSelect}
      textProperty="name"
      valueProperty="_id"
/>
           </div>
          
          
           <div className="col">

          {user && (
          <Link 
            to='/movies/new'
            className='btn btn-primary'
            style={{marginBottom: 20, marginTop:20}}>
            Add Movie</Link> )}
            
            {/* displays number of movies */}
             <p>Showing {totalCount} movies in the database.</p>

             <SearchBox value = {searchQuery} onChange= {this.handleSearch}/>

          {/* pass our movies as well as handlers for onLike and onDelete */}
           <MoviesTable 
           movies = {movies}
           onLike = {this.handleLike}
           onDelete = {this.handleDelete}
           onSort = {this.handleSort}
           sortColumn ={sortColumn}
           />
             
             <Pagination 
            //  we remove count and change to filtered.length
             itemsCount={totalCount} 
             pageSize={pageSize}
             onPageChange={this.handlePageChange}
             currentPage ={currentPage}/>
           </div>
          
       </div> );
    }
}
 
export default Movies;