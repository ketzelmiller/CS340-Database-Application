// Citation for the following function:
// Date: 2/16/2026
// Adapted from
// Source URL: https://www.youtube.com/watch?v=dYjdzpZv5yc and react documentation at https://react.dev

import { useState, useEffect } from "react";

function ServiceLevelsPage(){

  const [serviceLevels, setServiceLevels] = useState([]);
  const [error, setError] = useState("");

  const backend = "http://classwork.engr.oregonstate.edu:28542"
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
    await fetch(`${backend}/serviceLevel/${serviceLevelID}`, {
      method: 'DELETE'
    })
    await loadServiceLevels(); //refresh table
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
                <button className='update-button' type="button">Update</button>
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
      <form>
        <input style={{marginBottom: '7px', padding:'7px'}} type="text" name="serviceLevelName"        required="required" placeholder="Enter name"/>
        <br></br>
        <input style={{marginBottom: '7px', padding:'7px'}} type="text" name="serviceLevelDescription" required="required" placeholder="Enter description"/>
        <br></br>
        <button style={{marginTop: '5px', padding:'7px'}} type="submit">Add Service Level</button>
      </form>
    </div>
  )
};

export default ServiceLevelsPage;