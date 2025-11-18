import './App.css'
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisteForm from './components/registerForm';

import PublicRoute from './utils/PublicRoute';
import ProtectedRoute from './utils/ProtectedRoute';

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
        
        <Route
  path="/login"
  element={
    <PublicRoute>
      <LoginForm />
    </PublicRoute>
  }
/>

<Route
  path="/register"
  element={
    <PublicRoute>
      <RegisteForm />
    </PublicRoute>
  }
/>
         <Route path='/logout' element={<Logout/>} />

         {/* nested route begins with : */}
        
        <Route path='/customers' element={<Customers/>} />
        <Route path='/rentals' element={<Rentals />} />
        <Route path='/notFound' element={<NotFound />} />

{/* protecting apage for only members */}
<Route
  path="/movies/:id"
  element={
    <ProtectedRoute>
      <MovieForm />
    </ProtectedRoute>
  }
/>

      <Route 
  path="/movies" 
  element={<Movies user={this.state.user} />} 
/>

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