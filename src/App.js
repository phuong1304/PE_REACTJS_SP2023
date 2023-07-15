import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TopNews from './pages/TopNews';
import ContactForm from './pages/Contact.js'
import SignIn from './pages/SignIn';
import Navigation from './components/Navigation';
import RecipeReviewCard from './pages/Detail';
import Dashboard from './pages/DashBoard';
import Protected from './components/Protected';

import './App.css';


function App() {
  const isAuthenticated = true; // Replace this with your actual authentication logic

  return (

    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />}>
        </Route>
        <Route path='/detail/:id' element={<RecipeReviewCard />}></Route>
        {/* <Route path='/dashboard' element={<Dashboard />}></Route> */}

        <Route path="/topnews" element={<TopNews />} />
        <Route path="/contact" element={<ContactForm />} />
        {/* Other routes */}
        <Route exact path="/signin" element={<SignIn />} />
        {/* <PrivateRoute
          exact
          path='/dashboard' component={<Dashboard />}
          isAuthenticated={isAuthenticated}
        /> */}
        <Route path='/dashboard' element={<Protected><Dashboard /></Protected>}></Route>
      </Routes>
    </Router>

  );
}

export default App;
