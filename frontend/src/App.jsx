// Citation for following code:
// Date: 3/2/2026
// Adapted from Course Code
// Source URL: https://canvas.oregonstate.edu/courses/2031764/assignments/10323319?module_item_id=26243357

// Citation for the following onClick button code:
// Date: 3/2/2026
// Adapted from
// Source URL: https://stackoverflow.com/questions/75182498/how-can-i-trigger-the-useeffect-hook-with-a-button

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css';


import AdvisorsPage from './pages/AdvisorsPage';
import HomePage from './pages/HomePage';
import ClientsPage from './pages/ClientsPage';
import ServiceLevelsPage from './pages/ServiceLevelsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import BranchesPage from './pages/BranchesPage';


function App(){

  const [error, setError] = useState("");

  const backend = "http://classwork.engr.oregonstate.edu:28542"

  async function resetDatabase(){
    try{
      setError("")
      await fetch(`${backend}/reset`)
      await loadBranches();
      await loadClients();
      await loadAssignments();
      await loadAdvisors();
    }catch(err){
      console.error(err)
      setError("Failed to reset database")
    }
  }


  return(
    <div className ='app'>
      <h1>Financial Advisory Services Portal</h1>

      <Router>
        <nav className = 'appNav'>
          <Link to="/" className='nav-buttons' style={{ padding: "12px"}}>Home</Link>
          <Link to="/branches" className='nav-buttons' style={{ padding: "12px"}}>Branches</Link>
          <Link to="/advisors" className='nav-buttons' style={{ padding: "12px"}}>Advisors</Link>
          <Link to="/clients" className='nav-buttons' style={{ padding: "12px"}}>Clients</Link>
          <Link to="/serviceLevels" className='nav-buttons' style={{ padding: "12px"}}>Service Levels</Link>
          <Link to="/assignments" className='nav-buttons' style={{ padding: "12px"}}>Assignments</Link>

          {/*RESET BUTTON */}
          <button className='nav-buttons' onClick={resetDatabase}>RESET</button>

        </nav>

        <Routes>
          <Route path="/" element = {<HomePage />}/>
          <Route path="/branches" element = {<BranchesPage/>} />
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
