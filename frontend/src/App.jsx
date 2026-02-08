import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import AdvisorsPage from './pages/AdvisorsPage';
import HomePage from './pages/HomePage';


function App(){

  return(
    <div classname ='app'>
      <h1>Financial Advisory Services Portal</h1>

      <Router>
        <nav classname = 'appNav'>
          <Link to="/" style={{ padding: "12px"}}>Home</Link>
          <Link to="/advisors">Advisors</Link>
        </nav>

        <Routes>
          <Route path="/" element = {<HomePage />}/>
          <Route path="/advisors" element = {<AdvisorsPage />} />
        </Routes>
      </Router>
    </div>
  )
};

export default App;




