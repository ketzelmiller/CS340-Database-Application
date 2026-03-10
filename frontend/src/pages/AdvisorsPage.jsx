// Citation for the following function:
// Date: 2/16/2026
// Adapted from
// Source URL: https://www.youtube.com/watch?v=dYjdzpZv5yc and react documentation at https://react.dev

import { useState, useEffect } from "react";
import BranchesPage from "./BranchesPage";

function AdvisorsPage(){

  const [advisors, setAdvisors] = useState([]);
  const [branches, setBranches] = useState([])
  const [branchID, setBranchID] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("");

  const backend = "http://classwork.engr.oregonstate.edu:28542"
  //const backend = import.meta.env.VITE_BACKEND_URL || "http://classwork.engr.oregonstate.edu:28542"

  async function loadAdvisors(){
    try{
      setError("")
      const res = await fetch(`${backend}/advisors`)
      const data = await res.json()
      console.log("Data is: ", data)
      setAdvisors(data[0])
    }catch(err){
      console.error(err)
      setError("Failed to load advisors")
    }
  }

  async function addAdvisor(e){
    e.preventDefault()
    try{
      setError("")

      const res = await fetch(`${backend}/advisors`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          branchID: branchID
        })
      })
      if(!res.ok){
        throw new Error("Failed to add advisor")
      }

      // clear form
      setFirstName("")
      setLastName("")
      setEmail("")
      setBranchID("")

      // refresh table
      await loadAdvisors()

    }catch(err){
      console.error(err)
      setError("Failed to add advisor")
    }
  }

  async function loadBranchDropdown(){
    const res = await fetch(`${backend}/dropdown/branches`)
    const data = await res.json()
    setBranches(Array.isArray(data[0]) ? data[0] : data)
  }


  async function deleteAdvisor(advisorID){
    try{
      setError("")
      await fetch(`${backend}/advisors/${advisorID}`, {
        method: 'DELETE'
      })
      await loadAdvisors();
    } catch(err){
      console.error(err)
      setError("Failed to delete advisor.")
    }
  }

  useEffect(() => {
    loadBranchDropdown()
    loadAdvisors()
  }, []);

  return(
    <div style={{ padding: "20px"}}>
      <h1>Advisors</h1>

      <table className="advisor-table" border="3" style={{marginTop: "15px"}}>
        <thead>
          <tr>
            <th>Advisor ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Branch</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {advisors.map((a) => (
            <tr key ={a.advisorID}>
              <td>{a.advisorID}</td>
              <td>{a.firstName}</td>
              <td>{a.lastName}</td>
              <td>{a.email}</td>
              <td>{a.branchName}</td>
              <td>
                <button className='update-button' type="button">Update</button>
              </td>
              <td>
                <button className='delete-button' type='button' onClick={()=> deleteAdvisor(a.advisorID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr></hr>

      <h2>Insert Advisor</h2>
      <form onSubmit={addAdvisor}>
        <input 
          style={{marginBottom: '7px', padding:'7px'}} 
          type="text" 
          name="firstName"
          value={firstName}
          onChange={(e)=>setFirstName(e.target.value)} 
          required="required" 
          placeholder="Enter first name"/>
        <br></br>
        <input 
          style={{marginBottom: '7px', padding:'7px'}} 
          type="text" 
          name="lastName"
          value={lastName}
          onChange={(e)=>setLastName(e.target.value)} 
          required="required" 
          placeholder="Enter last name"/>
        <br></br>
        <input 
          style={{marginBottom: '7px', padding:'7px'}} 
          type="text" 
          name="email" 
          required="required" 
          placeholder="Enter email" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}/>
        <br></br>
        <label>
          Select Branch:
          <select 
            style={{marginLeft:'5px'}} 
            name="selectedBranch"
            value={branchID}
            onChange={(e) => setBranchID(e.target.value)}
            >
            <option value="">Select</option>
            {branches.map((b) => (
              <option key={b.branchID} value={b.branchID}>
                {b.branchName}
              </option>
            ))}
          </select>
        </label>
        <br></br>
        <button style={{marginTop: '8px', padding:'8px'}} type="submit">Add Advisor</button>
      </form>
    </div>
  )
};

export default AdvisorsPage;