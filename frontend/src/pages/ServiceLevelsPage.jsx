// Citation for the following function:
// Date: 2/16/2026
// Adapted from
// Source URL: https://www.youtube.com/watch?v=dYjdzpZv5yc and react documentation at https://react.dev

import { useState, useEffect } from "react";

function ServiceLevelsPage(){

  const [serviceLevels, setServiceLevels] = useState([]);
  const [error, setError] = useState("");
  const [serviceLevelName, setServiceLevelName] = useState("")
  const [description, setDescription] = useState("")

  const [updateServiceLevelName, setUpdateServiceLevelName] = useState("")
  const [updateDescription, setUpdateDescription] = useState("")

  const backend = "http://classwork.engr.oregonstate.edu:6098"
  //const backend = import.meta.env.VITE_BACKEND_URL || "http://classwork.engr.oregonstate.edu:28542"
  //const backend = "http://localhost:3001"

  async function loadServiceLevels(){
    try{
      setError("")
      const res = await fetch(`${backend}/serviceLevels`)
      const data = await res.json()
      console.log("Data is: ", data)
      setServiceLevels(data[0])
    }catch(err){
      console.error(err)
      setError("Failed to load serviceLevels")
    }
  }


  async function deleteServiceLevel(serviceLevelID){
    await fetch(`${backend}/serviceLevels/${serviceLevelID}`, {
      method: 'DELETE'
    })
    await loadServiceLevels(); //refresh table
  }

  // --- ADD ---
  async function addServiceLevel(e){
    e.preventDefault();
    try{
      setError("")
      
      // call the post route
      const res = await fetch(`${backend}/serviceLevels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceLevelName: serviceLevelName,
        description: description
      })
    })
    if (!res.ok){
      throw new Error("Failed to add service level.")
    }
    
    // clear form
    setServiceLevelName("")
    setDescription("")

    // refresh table
    await loadServiceLevels();

    }catch(err){
      console.error(err)
      setError("Failed to add service level.")
    }
  }

  // --- UPDATE ---
  async function updateServiceLevel(serviceLevelID){
    try{
      setError("")
      
      const res = await fetch(`${backend}/serviceLevels/${serviceLevelID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceLevelName: updateServiceLevelName,
          description: updateDescription
        })
      })

      if(!res.ok){
        throw new Error("Failed to update service level.")
      }

      // Refresh table and clear fields
      await loadServiceLevels();
      setUpdateServiceLevelName("");
      setUpdateDescription("");

    }catch(err){
      console.log(err)
      setError("Failed to update service level.")
    }
  }


  useEffect(() => {
    loadServiceLevels()
  }, []);

  return(
    <div classname = 'serviceLevelsTable' style={{ padding: "20px"}}>
      <h1>Service Levels</h1>

      <table className='service-level-table' border="3" style={{marginTop: "15px"}}>
        <thead>
          <tr>
            <th>Service Level ID</th>
            <th>Service Level Name</th>
            <th>Description</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {serviceLevels.map((a) => (
            <tr key ={a.serviceLevelID}>
              <td>{a.serviceLevelID}</td>
              <td>{a.serviceLevelName}</td>
              <td>{a.description}</td>
              <td>
                <button className='update-button' type="button" onClick={() => updateServiceLevel(a.serviceLevelID)}>Update</button>
              </td>
              <td>
                <button className='delete-button' type='button' onClick={() => deleteServiceLevel(a.serviceLevelID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr></hr>

      <h2>Insert Service Level</h2>
      <form onSubmit={addServiceLevel}>
        <input 
          style={{padding:'7px'}} 
          type="text" 
          name="serviceLevelName" 
          required="required" 
          placeholder="Enter name" 
          value={serviceLevelName} 
          onChange={(e) => setServiceLevelName(e.target.value)}
        />
        <br></br>
        <input 
          style={{padding:'7px'}} 
          type="text" 
          name="serviceLevelName" 
          required="required" 
          placeholder="Enter description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
        />
        <br></br>
        <button style={{marginTop: '5px', padding:'7px'}} type="submit">Add Service Level</button>
      </form>

      <h2>Modify Service Level</h2>
      <p>To Modify a Service Level, enter data in the form below, then click the 'update' button <br></br> next to the row you wish to modify.</p>
      <form>
        <input 
          style={{padding:'7px'}} 
          type="text" 
          name="serviceLevelName" 
          required="required" 
          placeholder="Enter name" 
          value={updateServiceLevelName} 
          onChange={(e) => setUpdateServiceLevelName(e.target.value)}
        />
        <br></br>
        <input 
          style={{padding:'7px'}} 
          type="text" 
          name="serviceLevelName" 
          required="required" 
          placeholder="Enter description" 
          value={updateDescription} 
          onChange={(e) => setUpdateDescription(e.target.value)}
        />
      </form>
    </div>
  )
};

export default ServiceLevelsPage;