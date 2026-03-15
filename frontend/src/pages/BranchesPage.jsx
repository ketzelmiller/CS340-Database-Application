// Citation for the following function:
// Date: 2/16/2026
// Adapted from
// Source URL: https://www.youtube.com/watch?v=dYjdzpZv5yc and react documentation at https://react.dev

import { useState, useEffect } from "react";

function BranchesPage(){
  
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState("");
  const [branchName, setBranchName] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [updateBranchName, setUpdateBranchName] = useState("")
  const [updateCity, setUpdateCity] = useState("")
  const [updateState, setUpdateState] = useState("")

  const backend = "http://classwork.engr.oregonstate.edu:6098"
  //const backend = "http://localhost:3001"

  // --- LOAD ---
  async function loadBranches(){
    try{
      setError("")
      const res = await fetch(`${backend}/branches`)
      const data = await res.json()
      console.log("Data is: ", data)
      setBranches(data[0])
    }catch(err){
      console.error(err)
      setError("Failed to load branches")
    }
  }

  // --- DELETE ---
  async function deleteBranch(branchID){
    await fetch(`${backend}/branches/${branchID}`, {
      method: 'DELETE'
    })
    await loadBranches(); //refresh table
  }

  // --- ADD ---
  async function addBranch(e){
    e.preventDefault();
    try{
      setError("")
      
      // call the post route
      const res = await fetch(`${backend}/branches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        branchName: branchName,
        city: city,
        state: state
      })
    })
    if (!res.ok){
      throw new Error("Failed to add branch.")
    }
    
    // clear form
    setBranchName("")
    setCity("")
    setState("")

    // refresh table
    await loadBranches();

    }catch(err){
      console.error(err)
      setError("Failed to add branch.")
    }
  }

  // --- UPDATE ---
  async function updateBranch(branchID){
    try{
      setError("")
      
      const res = await fetch(`${backend}/branches/${branchID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branchName: updateBranchName,
          city: updateCity,
          state: updateState
        })
      })

      if(!res.ok){
        throw new Error("Failed to update branch.")
      }

      // Refresh table and clear fields
      await loadBranches();
      setUpdateBranchName("");
      setUpdateCity("")
      setUpdateState("")

    }catch(err){
      console.log(err)
      setError("Failed to update branch.")
    }
  }

  useEffect(() => {
    loadBranches()
  }, []);

  return(
    <div className = 'branches-heading' style={{ padding: "20px"}}>
      <h1>Branches</h1>

      <table className= 'branches-table' border="3" style={{marginTop: "15px"}}>
        <thead>
          <tr>
            <th>Branch ID</th>
            <th>Branch Name</th>
            <th>City</th>
            <th>State</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody className='branch-form'>
          {branches.map((a) => (
            <tr key ={a.branchID}>
              <td>{a.branchID}</td>
              <td>{a.branchName}</td>
              <td>{a.city}</td>
              <td>{a.state}</td>
              <td>
                <button className='update-button' type="button" onClick={() => updateBranch(a.branchID)}>Update</button>
              </td>
              <td>
                <button className='delete-button' type='button' onClick={() => deleteBranch(a.branchID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr></hr>

      <h2>Insert Branch</h2>
      <form onSubmit={addBranch}>
        <input 
          style={{padding:'7px'}} 
          type="text" 
          name="branchName" 
          required="required" 
          placeholder="Enter branch name" 
          value={branchName} 
          onChange={(e) => setBranchName(e.target.value)}
        />
        <br></br>
        <input 
          style={{marginTop: '7px', marginBottom: '6px', padding:'7px'}} 
          type="text" 
          name="city" 
          required="required" 
          placeholder="Enter city" 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
        />
        <br></br>
        <label>
          Select State:
          <select 
            style={{marginLeft:'7px'}} 
            name="selectedState"
            value = {state}
            onChange={(e) => setState(e.target.value)}>
            <option value="">Select</option>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="DC">DC</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="PR">PR</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VI">VI</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
          </select>
        </label>
        <br></br>
        <button style={{marginTop: '7px', padding:'8px'}} type="submit">Add Branch</button>
      </form>

      <h2>Modify Branch</h2>
      <p>To Modify a Branch, enter data in the form below, then click the 'update' button <br></br> next to the row you wish to modify.</p>
      <form>
        <input 
          style={{padding:'7px'}} 
          type="text" 
          name="branchName" 
          required="required" 
          placeholder="Enter branch name" 
          value={updateBranchName} 
          onChange={(e) => setUpdateBranchName(e.target.value)}
        />
        <br></br>
        <input 
          style={{marginTop: '7px', marginBottom: '6px', padding:'7px'}} 
          type="text" 
          name="city" 
          required="required" 
          placeholder="Enter city" 
          value={updateCity} 
          onChange={(e) => setUpdateCity(e.target.value)}
        />
        <br></br>
        <label>
          Select State:
          <select 
            style={{marginLeft:'7px'}} 
            name="selectedState"
            value = {updateState}
            onChange={(e) => setUpdateState(e.target.value)}>
            <option value="">Select</option>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="DC">DC</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="PR">PR</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VI">VI</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
          </select>
        </label>
      </form>
    </div>
  )
};

export default BranchesPage;