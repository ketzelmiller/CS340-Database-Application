import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css';

import AdvisorsPage from './pages/AdvisorsPage';
import HomePage from './pages/HomePage';
import ClientsPage from './pages/ClientsPage';
import ServiceLevelsPage from './pages/ServiceLevelsPage';
import AssignmentsPage from './pages/AssignmentsPage';


function App(){
  return(
    <div className ='app'>
      <h1>Financial Advisory Services Portal</h1>

      <Router>
        <nav className = 'appNav'>
<<<<<<< HEAD
          <Link to="/" style={{ padding: "12px"}}>Home</Link>
          <Link to="/advisors" style={{ padding: "12px"}}>Advisors</Link>
          <Link to="/clients" style={{ padding: "12px"}}>Clients</Link>
          <Link to ="/serviceLevels" style={{ padding: "12px"}}>Service Levels</Link>
          <Link to="/assignments">Assignments</Link>
=======
          <Link to="/" className='nav-buttons' style={{ padding: "12px"}}>Home</Link>
          <Link to="/branches" className='nav-buttons' style={{ padding: "12px"}}>Branches</Link>
          <Link to="/advisors" className='nav-buttons' style={{ padding: "12px"}}>Advisors</Link>
          <Link to="/clients" className='nav-buttons' style={{ padding: "12px"}}>Clients</Link>
          <Link to="/serviceLevels" className='nav-buttons' style={{ padding: "12px"}}>Service Levels</Link>
          <Link to="/assignments" className='nav-buttons' style={{ padding: "12px"}}>Assignments</Link>
>>>>>>> 667e7d0 (Updated CSS styling, changed UI elements within pages)

        </nav>

        <Routes>
          <Route path="/" element = {<HomePage />}/>
          <Route path="/advisors" element = {<AdvisorsPage />} />
          <Route path="/clients" element = {<ClientsPage/>} />
          <Route path="/serviceLevels" element = {<ServiceLevelsPage/>} />
          <Route path="/assignments" element = {<AssignmentsPage/>} />
        </Routes>
      </Router>
    </div>
  )
};

export default App;




