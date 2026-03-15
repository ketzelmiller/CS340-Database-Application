// Citation for the following function:
// Date: 2/16/2026
// Adapted from
// Source URL: https://www.youtube.com/watch?v=dYjdzpZv5yc and react documentation at https://react.dev

import { useState, useEffect } from "react";

function AdvisorsPage(){

  const [advisors, setAdvisors] = useState([]);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [branch, setBranch] = useState("")

  const [updateFirstName, setUpdateFirstName] = useState("")
  const [updateLastName, setUpdateLastName] = useState("")
  const [updateEmail, setUpdateEmail] = useState("")
  const [updateBranch, setUpdateBranch] = useState("")

  const [branches, setBranches] = useState([])

  const backend = "http://classwork.engr.oregonstate.edu:28544"
  //const backend = import.meta.env.VITE_BACKEND_URL || "http://classwork.engr.oregonstate.edu:28542"
  //const backend = "http://localhost:3001"


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

  // --- ADD ---
  async function addAdvisor(e){
    e.preventDefault();
    try{
      setError("")
      
      // call the post route
      const res = await fetch(`${backend}/advisors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        branch: branch
      })
    })
    if (!res.ok){
      throw new Error("Failed to add advisor.")
    }
    
    // clear form
    setFirstName("")
    setLastName("")
    setEmail("")
    setBranch("")

    // refresh table
    await loadAdvisors();

    }catch(err){
      console.error(err)
      setError("Failed to add advisor.")
    }
  }

  // --- UPDATE ---
  async function updateAdvisor(advisorID){
    try{
      setError("")
      
      const res = await fetch(`${backend}/advisors/${advisorID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: updateFirstName,
          lastName: updateLastName,
          email: updateEmail,
          branch: updateBranch
        })
      })

      if(!res.ok){
        throw new Error("Failed to update advisor.")
      }

      // Refresh table and clear fields
      await loadAdvisors();
      setUpdateFirstName("");
      setUpdateLastName("");
      setUpdateEmail("");
      setUpdateBranch("");

    }catch(err){
      console.log(err)
      setError("Failed to update advisor.")
    }
  }

  // --- GET DROPDOWN ---
  async function loadBranchDropdown(){
    const res = await fetch(`${backend}/dropdown/branches`)
    const data = await res.json()
    setBranches(Array.isArray(data[0]) ? data[0] : data)
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
                <button className='update-button' type="button" onClick={() => updateAdvisor(a.advisorID)}>Update</button>
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
      <form className='advisor-form' onSubmit={addAdvisor}>
        <input 
          style={{padding:'7px'}} 
          type="text" 
          name="firstName" 
          required="required" 
          placeholder="Enter first name" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br></br>
        <input 
          style={{padding:'7px'}} 
          type="text" 
          name="lastName" 
          required="required" 
          placeholder="Enter last name" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)}
        />
        <br></br>
        <input 
          style={{padding:'7px'}} 
          type="text" 
          name="email" 
          required="required" 
          placeholder="Enter email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <label>
          Select Branch:
          <select 
            style={{marginLeft:'7px'}} 
            name="selectedBranch"
            required="required" 
            value = {branch}
            onChange={(e) => setBranch(e.target.value)}>
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

      <h2>Modify Advisor</h2>
      <p>To Modify an Advisor, enter data in the form below, then click the 'update' button <br></br> next to the row you wish to modify.</p>
      <form className='advisor-form'>
        <input 
          style={{padding:'7px'}} 
          type="text" 
          name="firstName" 
          required="required" 
          placeholder="Enter first name" 
          value={updateFirstName} 
          onChange={(e) => setUpdateFirstName(e.target.value)}
        />
        <br></br>
        <input 
          style={{padding:'7px'}} 
          type="text" 
          name="lastName" 
          required="required" 
          placeholder="Enter last name" 
          value={updateLastName} 
          onChange={(e) => setUpdateLastName(e.target.value)}
        />
        <br></br>
        <input 
          style={{padding:'7px'}} 
          type="text" 
          name="email" 
          required="required" 
          placeholder="Enter email" 
          value={updateEmail} 
          onChange={(e) => setUpdateEmail(e.target.value)}
        />
        <br></br>
        <label>
          Select Branch:
          <select 
            style={{marginLeft:'7px'}} 
            name="selectedBranch"
            required="required" 
            value = {updateBranch}
            onChange={(e) => setUpdateBranch(e.target.value)}>
            <option value="">Select</option>
            {branches.map((b) => (
              <option key={b.branchID} value={b.branchID}>
                {b.branchName}
              </option>
            ))}
          </select>
        </label>
      </form>
    </div>
  )
};

export default AdvisorsPage;