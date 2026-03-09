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

  const backend = "http://classwork.engr.oregonstate.edu:28542"
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
          advisorName: advisorName,
          clientName: clientName,
          serviceLevelName: serviceLevelName,
          relationshipStartDate: relationshipStartDate,
          relationshipEndDate: relationshipEndDate || null
        })
      })

      if(!res.ok){
        throw new Error("Failed to update assignment.")
      }

      // Refresh table and clear fields
      await loadAssignments();
      setAdvisorName("")
      setClientName("")
      setServiceLevelName("")
      setRelationshipStartDate("")
      setRelationshipEndDate("")

    }catch(err){
      console.log(err)
      setError("Failed to update assignment.")
    }
  }

  // Reload page
  useEffect(() => {
    loadAssignments()
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
            value = {advisorName}
            onChange={(e) => setAdvisorName(e.target.value)}>
            <option value="James Kirk">James Kirk</option>
            <option value="Jean-Luc Picard">Jean-Luc Picard</option>
            <option value="Benjamin Sisko">Benjamin Sisko</option>
            <option value="Kathyrn Janeway">Kathyrn Janeway</option>
            <option value="Jonathan Archer">Jonathan Archer</option>
            <option value="Elim Garak">Elim Garak</option>
          </select>
        </label>
        <br></br>
        <label>
          Select Client:
          <select 
            style={{marginBottom: '7px'}} 
            name="selectedClient"
            value = {clientName}
            onChange={(e) => setClientName(e.target.value)}>
            <option value="Montgomery Scott">Montgomery Scott</option>
            <option value="Hikaru Sulu">Hikaru Sulu</option>
            <option value="Pavel Chekov">Pavel Chekov</option>
            <option value="William Riker">William Riker</option>
            <option value="Deanna Troi">Deanna Troi</option>
            <option value="Geordi La Forge">Geordi La Forge</option>
            <option value="Jadzia Dax">Jadzia Dax</option>
            <option value="Kira Nerys">Kira Nerys</option>
            <option value="Thomas Paris">Thomas Paris</option>
            <option value="Harry Kim">Harry Kim</option>
            <option value="Charles Tucker">Charles Tucker</option>
            <option value="Hoshi Sato">Hoshi Sato</option>
            <option value="Ro Laren">Ro Laren</option>
            <option value="Winn Adami">Winn Adami</option>
          </select>
        </label>
        <br></br>
        <label>
          Select Service Level:
          <select 
            style={{marginBottom: '7px'}}
            name="selectedServiceLevel"
            value = {serviceLevelName}
            onChange={(e) => setServiceLevelName(e.target.value)}>
            <option value="Planning Only">Planning Only</option>
            <option value="Managed Portfolio">Managed Portfolio</option>
            <option value="Rebalancing Guidance">Rebalancing Guidance</option>
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
    </div>
  )
};

export default AssignmentsPage;