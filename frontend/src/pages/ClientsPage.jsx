// Citation for the following function:
// Date: 2/16/2026
// Adapted from
// Source URL: https://www.youtube.com/watch?v=dYjdzpZv5yc and react documentation at https://react.dev

import { useState, useEffect } from "react";

function ClientsPage(){
  
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");

  const backend = "http://classwork.engr.oregonstate.edu:28542"


  async function loadClients(){
    try{
      setError("")
      const res = await fetch(`${backend}/clients`)
      const data = await res.json()
      console.log("Data is: ", data)
      setClients(data[0])
    }catch(err){
      console.error(err)
      setError("Failed to load clients")
    }
  }

  async function deleteClient(clientID){
    await fetch(`http://classwork.engr.oregonstate.edu:28542/clients/${clientID}`, {
      method: 'DELETE'
    })
    await loadClients(); //refresh table
  }

  useEffect(() => {
    loadClients()
  }, []);

  return(
    <div style={{ padding: "20px"}}>
      <h1>Clients</h1>

      <table className = 'client-table' border="3" style={{marginTop: "15px"}}>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((a) => (
            <tr key ={a.clients}>
              <td>{a.clientID}</td>
              <td>{a.firstName}</td>
              <td>{a.lastName}</td>
              <td>{a.email}</td>
              <td>{a.dateOfBirth}</td>
              <td>
                <button className='update-button' type="button">Update</button>
              </td>
              <td>
                <button className='delete-button' type='button' onClick={() => deleteClient(a.clientID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr></hr>

      <h2>Insert Client</h2>
      <form>
        <input style={{marginBottom: '7px', padding:'7px'}} type="text"   name="firstName"   required="required" placeholder="Enter first name"/>
        <br></br>
        <input style={{marginBottom: '7px', padding:'7px'}} type="text"   name="lastName"    required="required" placeholder="Enter last name"/>
        <br></br>
        <input style={{marginBottom: '7px', padding:'7px'}} type="text"   name="email"       required="required" placeholder="Enter email"/>
        <br></br>
        <label>
          Enter Date of Birth:
          <input style={{marginLeft:'8px'}} type="date"   name="dateOfBirth" required="required"/>
        </label>
        <br></br>
        <button style={{marginTop: '8px', padding:'7px'}} type="submit">Add Client</button>
      </form>
    </div>
  )
};

export default ClientsPage;