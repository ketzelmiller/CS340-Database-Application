// Citation for the following function:
// Date: 2/16/2026
// Adapted from
// Source URL: https://www.youtube.com/watch?v=dYjdzpZv5yc and react documentation at https://react.dev

import { useState, useEffect } from "react";

function AdvisorsPage(){

  const [advisors, setAdvisors] = useState([]);
  const [error, setError] = useState("");

  const backend = "http://classwork.engr.oregonstate.edu:4881"

  async function loadAdvisors(){
    try{
      setError("")
      const res = await fetch(`${backend}/advisors`)
      const data = await res.json()
      setAdvisors(data)
    }catch(err){
      console.error(err)
      setError("Failed to load advisors")
    }
  }

  useEffect(() => {
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
                <button className='delete-button' type='button'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr></hr>

      <h2>Insert Advisor</h2>
      <form>
        <input style={{marginBottom: '7px', padding:'7px'}} type="text" name="firstName"   required="required" placeholder="Enter first name"/>
        <br></br>
        <input style={{marginBottom: '7px', padding:'7px'}} type="text" name="lastName"    required="required" placeholder="Enter last name"/>
        <br></br>
        <input style={{marginBottom: '7px', padding:'7px'}} type="text" name="email"       required="required" placeholder="Enter email"/>
        <br></br>
        <label>
          Select Branch:
          <select style={{marginLeft:'5px'}} name="selectedBranch">
            <option value="Hawaii Branch">Hawaii Branch</option>
            <option value="Massachusetts Branch">Massachusetts Branch</option>
            <option value="Oregon Branch">Oregon Branch</option>
            <option value="New York Branch">New York Branch</option>
          </select>
        </label>
        <br></br>
        <button style={{marginTop: '8px', padding:'8px'}} type="submit">Add Advisor</button>
      </form>
    </div>
  )
};

export default AdvisorsPage;