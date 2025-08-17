import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Movies from './components/movies';
import { Route, Routes, Navigate } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';

function App() {
  return (
    <div>
      <NavBar/>
       <Routes>
        {/* nested route begins with : */}
         <Route path='/login' element={<LoginForm/>} />
          <Route path='/movies/:id' element={<MovieForm/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/customers' element={<Customers/>} />
        <Route path='/rentals' element={<Rentals />} />
        <Route path='/notFound' element={<NotFound />} />
        {/* Redirect from / to /movies which is homepage */}
        <Route path='/' element={<Navigate to='/movies' />} />
        {/* Catch-all route for 404 */}
        <Route path='*' element={<Navigate to='/notFound' />} />
        </Routes>
    </div>
  );
}

export default App;