import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import TopNews from './components/TopNews';
import Contact from './components/Contact';
import SignIn from './components/SignIn';
import Navigation from './components/Navigation';
import Detail from './components/Detail';
import Dashboard from './components/DashBoard';
import './App.css';

function App() {
  return (

    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />}>
        </Route>
        <Route path='/detail/:id' element={<Detail />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>

        <Route path="/topnews" component={<TopNews />} />
        <Route path="/contact" component={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>

  );
}

export default App;
