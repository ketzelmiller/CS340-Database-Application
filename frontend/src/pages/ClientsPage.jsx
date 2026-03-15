// Citation for the following function:
// Date: 2/16/2026
// Adapted from
// Source URL: https://www.youtube.com/watch?v=dYjdzpZv5yc and react documentation at https://react.dev

// Citation for date fix:
// Date: 3/9/2026
// Copied From
// Source URL: https://edstem.org/us/courses/89768/discussion/7758572?answer=18012218

import { useState, useEffect } from "react";

function ClientsPage(){
  
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")

  const backend = "http://classwork.engr.oregonstate.edu:6044"
   //const backend = "http://localhost:3001"

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
    await fetch(`${backend}/clients/${clientID}`, {
      method: 'DELETE'
    })
    await loadClients(); //refresh table
  }

  // --- ADD ---
  async function addClient(e){
    e.preventDefault();
    try{
      setError("")
      
      // call the post route
      const res = await fetch(`${backend}/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        dateOfBirth: dateOfBirth
      })
    })
    if (!res.ok){
      throw new Error("Failed to add client.")
    }
    
    // clear form
    setFirstName("")
    setLastName("")
    setEmail("")
    setDateOfBirth("")

    // refresh table
    await loadClients();

    }catch(err){
      console.error(err)
      setError("Failed to add client.")
    }
  }

  // --- UPDATE ---
  async function updateClient(ClientID){
    try{
      setError("")
      
      const res = await fetch(`${backend}/clients/${ClientID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          dateOfBirth: dateOfBirth
        })
      })

      if(!res.ok){
        throw new Error("Failed to update client.")
      }

      // Refresh table and clear fields
      await loadClients();
      setFirstName("");
      setLastName("");
      setEmail("");
      setDateOfBirth("");

    }catch(err){
      console.log(err)
      setError("Failed to update client.")
    }
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
              <td>{a.dateOfBirth.substring(0, 10)}</td>
              <td>
                <button className='update-button' type="button" onClick={() => updateClient(a.clientID)}>Update</button>
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
      <form onSubmit={addClient}>
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
          Enter Date of Birth:
          <input 
            style={{marginLeft:'8px'}} 
            type="date"   
            name="dateOfBirth" 
            required="required"
            value={dateOfBirth} 
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </label>
        <br></br>
        <button style={{marginTop: '8px', padding:'7px'}} type="submit">Add Client</button>
      </form>
    </div>
  )
};

export default ClientsPage;