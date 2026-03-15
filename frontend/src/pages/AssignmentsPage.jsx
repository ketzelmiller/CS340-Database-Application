// Citation for the following function:
// Date: 2/16/2026
// Adapted from
// Source URL: https://www.youtube.com/watch?v=dYjdzpZv5yc and react documentation at https://react.dev

// Citation for date fix:
// Date: 3/9/2026
// Copied From
// Source URL: https://edstem.org/us/courses/89768/discussion/7758572?answer=18012218

import { useState, useEffect } from "react";

function AssignmentsPage(){

  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");
  const [advisorName, setAdvisorName] = useState("")
  const [clientName, setClientName] = useState("")
  const [serviceLevelName, setServiceLevelName] = useState("")
  const [relationshipStartDate, setRelationshipStartDate] = useState("")
  const [relationshipEndDate, setRelationshipEndDate] = useState("")

  const [updateAdvisorName, setUpdateAdvisorName] = useState("")
  const [updateClientName, setUpdateClientName] = useState("")
  const [updateServiceLevelName, setUpdateServiceLevelName] = useState("")
  const [updateRelationshipStartDate, setUpdateRelationshipStartDate] = useState("")
  const [updateRelationshipEndDate, setUpdateRelationshipEndDate] = useState("")

  const [advisors, setAdvisors] = useState([])
  const [clients, setClients] = useState([])
  const [serviceLevels, setServiceLevels] = useState([])

  const backend = "http://classwork.engr.oregonstate.edu:28544"
   //const backend = "http://localhost:3001"

  async function loadAssignments(){
    try{
      setError("")
      const res = await fetch(`${backend}/assignments`)
      const data = await res.json()
      console.log("Data is: ", data)
      setAssignments(data[0])
    }catch(err){
      console.error(err)
      setError("Failed to load assignments")
    }
  }

  async function deleteAssignment(assignmentID){
    await fetch(`${backend}/assignments/${assignmentID}`, {
      method: 'DELETE'
    })
    await loadAssignments(); //refresh table
  }

  async function addAssignment(e){
    e.preventDefault();
    try{
      setError("")

      const res = await fetch(`${backend}/assignments`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          advisorName: advisorName,
          clientName: clientName,
          serviceLevelName: serviceLevelName,
          relationshipStartDate: relationshipStartDate,
          relationshipEndDate: relationshipEndDate || null
        })
      })

      if(!res.ok){
        throw new Error("Failed to add assignment")
      }

      setAdvisorName("")
      setClientName("")
      setServiceLevelName("")
      setRelationshipStartDate("")
      setRelationshipEndDate("")

      // refresh table
      await loadAssignments();

    }catch(err){
      console.error(err)
      setError("Failed to add assignment.")
    }
  }

  // --- UPDATE ---
  async function updateAssignment(assignmentID){
    try{
      setError("")
      
      const res = await fetch(`${backend}/assignments/${assignmentID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          advisorName: updateAdvisorName,
          clientName: updateClientName,
          serviceLevelName: updateServiceLevelName,
          relationshipStartDate: updateRelationshipStartDate,
          relationshipEndDate: updateRelationshipEndDate || null
        })
      })

      if(!res.ok){
        throw new Error("Failed to update assignment.")
      }

      // Refresh table and clear fields
      await loadAssignments();
      setUpdateAdvisorName("")
      setUpdateClientName("")
      setUpdateServiceLevelName("")
      setUpdateRelationshipStartDate("")
      setUpdateRelationshipEndDate("")

    }catch(err){
      console.log(err)
      setError("Failed to update assignment.")
    }
  }

  // --- GET DROPDOWNS ---
  async function loadAdvisorDropdown(){
    const res = await fetch(`${backend}/dropdown/advisors`)
    const data = await res.json()
    setAdvisors(data)
    console.log("Advisors dropdown data: ", data)
  }
  async function loadClientDropdown(){
    const res = await fetch(`${backend}/dropdown/clients`)
    const data = await res.json()
    setClients(data)
    console.log("Clients dropdown data: ", data)
  }
  async function loadServiceLevelDropdown(){
    const res = await fetch(`${backend}/dropdown/serviceLevels`)
    const data = await res.json()
    setServiceLevels(data)
    console.log("Service Level dropdown data: ", data)
  }

  // Reload page
  useEffect(() => {
    loadAssignments()
    loadAdvisorDropdown()
    loadClientDropdown()
    loadServiceLevelDropdown()
  }, []);

  return(
    <div style={{ padding: "20px"}}>
      <h1>Adivsor-Client Assignments</h1>

      <table className='assignment-table' border="3" style={{marginTop: "15px"}}>
        <thead>
          <tr>
            <th>Assignment ID</th>
            <th>Advisor Name</th>
            <th>Client Name</th>
            <th>Service Level</th>
            <th>Relationship Start Date</th>
            <th>Relationship End Date</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {assignments.map((a) => (
            <tr key ={a.assignmentID}>
              <td>{a.assignmentID}</td>
              <td>{a.advisorName}</td>
              <td>{a.clientName}</td>
              <td>{a.serviceLevel}</td>
              <td>{a.startDate.substring(0, 10)}</td>
              <td>{a.endDate}</td>
              <td>
                <button className='update-button' type="button" onClick={() => {updateAssignment(a.assignmentID)}}>Update</button>
              </td>
              <td>
                <button className='delete-button' type='button' onClick={() =>{deleteAssignment(a.assignmentID)}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr></hr>
      
      
      <h2>Insert Assignment</h2> 
      <form className='assignment-form' onSubmit={addAssignment}>
        <label>
          Select Advisor:
          <select 
            style={{marginBottom: '7px'}} 
            name="selectedAdvisor"
            required="required"
            value = {advisorName}
            onChange={(e) => setAdvisorName(e.target.value)}>
            <option value="">Select</option>
            {advisors.map((a) => (
              <option key={a.advisorID} value={a.advisorID}>
                {a["CONCAT(firstName, ' ', lastName)"]}
              </option>
            ))}
          </select>
        </label>
        <br></br>
        <label>
          Select Client:
          <select 
            style={{marginBottom: '7px'}} 
            name="selectedClient"
            required="required"
            value = {clientName}
            onChange={(e) => setClientName(e.target.value)}>
            <option value="">Select</option>
            {clients.map((c) => (
              <option key={c.clientID} value={c.clientID}>
                {c["CONCAT(firstName, ' ', lastName)"]}
              </option>
            ))}
          </select>
        </label>
        <br></br>
        <label>
          Select Service Level:
          <select 
            style={{marginBottom: '7px'}}
            name="selectedServiceLevel"
            required="required"
            value = {serviceLevelName}
            onChange={(e) => setServiceLevelName(e.target.value)}>
            <option value="">Select</option>
            {serviceLevels.map((s) => (
              <option key={s.serviceLevelID} value={s.serviceLevelID}>
                {s.serviceLevelName}
              </option>
            ))}
          </select>
        </label>
        <br></br>
        <label>
          Enter Start Date:
          <input 
            style={{marginBottom: '7px'}}
            type="date"
            name="startDate"
            required="required"
            value={relationshipStartDate} 
            onChange={(e) => setRelationshipStartDate(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Enter End Date, if any:
          <input 
            style={{marginBottom: '7px'}} 
            type="date" 
            name="endDate"
            value={relationshipEndDate}
            onChange={(e) => setRelationshipEndDate(e.target.value)}
          />
        </label>
        <br></br>
        <button style={{marginTop: '7px'}} type="submit">Add Assignment</button>
      </form>
      <h2>Modify Assignment</h2>
      <p>To Modify an Assignment, enter data in the form below, then click the 'update' button <br></br> next to the row you wish to modify.</p>
      <form className='assignment-form'>
        <label>
          Select Advisor:
          <select 
            style={{marginBottom: '7px'}} 
            name="selectedAdvisor"
            required="required"
            value = {updateAdvisorName}
            onChange={(e) => setUpdateAdvisorName(e.target.value)}>
            <option value="">Select</option>
            {advisors.map((a) => (
              <option key={a.advisorID} value={a.advisorID}>
                {a["CONCAT(firstName, ' ', lastName)"]}
              </option>
            ))}
          </select>
        </label>
        <br></br>
        <label>
          Select Client:
          <select 
            style={{marginBottom: '7px'}} 
            name="selectedClient"
            required="required"
            value = {updateClientName}
            onChange={(e) => setUpdateClientName(e.target.value)}>
            <option value="">Select</option>
            {clients.map((c) => (
              <option key={c.clientID} value={c.clientID}>
                {c["CONCAT(firstName, ' ', lastName)"]}
              </option>
            ))}
          </select>
        </label>
        <br></br>
        <label>
          Select Service Level:
          <select 
            style={{marginBottom: '7px'}}
            name="selectedServiceLevel"
            required="required"
            value = {updateServiceLevelName}
            onChange={(e) => setUpdateServiceLevelName(e.target.value)}>
            <option value="">Select</option>
            {serviceLevels.map((s) => (
              <option key={s.serviceLevelID} value={s.serviceLevelID}>
                {s.serviceLevelName}
              </option>
            ))}
          </select>
        </label>
        <br></br>
        <label>
          Enter Start Date:
          <input 
            style={{marginBottom: '7px'}}
            type="date"
            name="startDate"
            required="required"
            value={updateRelationshipStartDate} 
            onChange={(e) => setUpdateRelationshipStartDate(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Enter End Date, if any:
          <input 
            style={{marginBottom: '7px'}} 
            type="date" 
            name="endDate"
            value={updateRelationshipEndDate}
            onChange={(e) => setUpdateRelationshipEndDate(e.target.value)}
          />
        </label>
        <button style={{marginTop: '7px'}} type="submit">Add Assignment</button>
      </form>
    </div>
  )
};

export default AssignmentsPage;