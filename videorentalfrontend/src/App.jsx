import './App.css'
import React, { Component } from 'react';
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
import RegisteForm from './components/registerForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logout from './common/logout';
import auth from './services/authService'

class App extends Component {
state = {};

// helps to show user
componentDidMount(){
const user = auth.getCurrentUser();
  this.setState({user}); 
}

render() {
  return (
    <div>
      <ToastContainer/>
      <NavBar user = {this.state.user}/>
       <Routes>
        
        <Route path='/register' element={<RegisteForm/>} />
         <Route path='/login' element={<LoginForm/>} />
         <Route path='/logout' element={<Logout/>} />

         {/* nested route begins with : */}
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
}

export default App;