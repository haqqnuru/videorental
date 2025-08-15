import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MovieForm = () => {
    // displays the id of the movie.
  const { id } = useParams(); 
  const navigate = useNavigate();

  return (
    <div>
        {/* displays with the movies id */}
    <h1>Movie Form {id}</h1>
    <button className="btn btn-primary"
    // redirects to the movies page
    onClick={() =>navigate('/movies')}>Save</button>
    
    </div>
  );
}

export default MovieForm;