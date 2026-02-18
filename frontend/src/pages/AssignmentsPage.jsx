
function AssignmentsPage(){
<<<<<<< HEAD

=======
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
          <tr>
            <td>1</td>
            <td>James Kirk</td>
            <td>Montgomery Scott</td>
            <td>Planning Only</td>
            <td>2025-01-27</td>
            <td>Ongoing</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Benjamin Sisko</td>
            <td>Montgomery Scott</td>
            <td>Managed Portfolio</td>
            <td>2025-04-23</td>
            <td>2025-07-12</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>3</td>
            <td>James Kirk</td>
            <td>Hikaru Sulu</td>
            <td>Planning Only</td>
            <td>2025-03-21</td>
            <td>2025-07-18</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>4</td>
            <td>James Kirk</td>
            <td>Pavel Chekov</td>
            <td>Managed Portfolio</td>
            <td>2025-03-12</td>
            <td>Ongoing</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>5</td>
            <td>Jean-Luc Picard</td>
            <td>Willian Riker</td>
            <td>Planning Only</td>
            <td>2025-04-22</td>
            <td>Ongoing</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>6</td>
            <td>Jean-Luc Picard</td>
            <td>Deanna Troi</td>
            <td>Rebalancing Guideance</td>
            <td>2025-08-19</td>
            <td>Ongoing</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>7</td>
            <td>Jean-Luc Picard</td>
            <td>Geordi La Forge</td>
            <td>Managed Portfolio</td>
            <td>2025-09-03</td>
            <td>Ongoing</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>8</td>
            <td>Jonathan Archer</td>
            <td>Geordi La Forge</td>
            <td>Rebalancing Guideance</td>
            <td>2025-12-04</td>
            <td>Ongoing</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>9</td>
            <td>Benjamin Sisko</td>
            <td>Jadzia Dax</td>
            <td>Rebalancing Guideance</td>
            <td>2025-06-04</td>
            <td>2025-06-07</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>10</td>
            <td>Benjamin Sisko</td>
            <td>Kira Nerys</td>
            <td>Planning Only</td>
            <td>2025-07-25</td>
            <td>2025-10-29</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>11</td>
            <td>Kathryn Janeway</td>
            <td>Thomas Paris</td>
            <td>Managed Portfolio</td>
            <td>2025-01-17</td>
            <td>2025-04-10</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>12</td>
            <td>Kathryn Janeway</td>
            <td>Harry Kim</td>
            <td>Planning Only</td>
            <td>2025-04-03</td>
            <td>2025-09-16</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>13</td>
            <td>James Kirk</td>
            <td>Thomas Paris</td>
            <td>Rebalancing Guideance</td>
            <td>2025-04-08</td>
            <td>Ongoing</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>14</td>
            <td>James Kirk</td>
            <td>Harry Kim</td>
            <td>Managed Portfolio</td>
            <td>2025-08-09</td>
            <td>Ongoing</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>15</td>
            <td>Jonathan Archer</td>
            <td>Charles Tucker</td>
            <td>Planning Only</td>
            <td>2025-02-13</td>
            <td>Ongoing</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>16</td>
            <td>Jonathan Archer</td>
            <td>Hoshi Sato</td>
            <td>Rebalancing Guideance</td>
            <td>2025-04-09</td>
            <td>Ongoing</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>17</td>
            <td>Jean-Luc Picard</td>
            <td>Hoshi Sato</td>
            <td>Rebalancing Guideance</td>
            <td>2025-04-05</td>
            <td>2025-04-09</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
        </tbody>
      </table>

      <hr></hr>

      <h2>Insert Assignment</h2> 
      <form className='assignment-form'>
        <label>
          Select Advisor:
          <select style={{marginBottom: '7px'}} name="selectedServiceLevel">
            <option value="James Kirk">James Kirk</option>
            <option value="Jean-Luc Picard">Jean-Luc Picard</option>
            <option value="Benjamin Sisko">Benjamin Sisko</option>
            <option value="Kathyrn Janeway">Bejamin Sisko</option>
            <option value="Jonathan Archer">Jonathan Archer</option>
            <option value="Elim Garak">Elim Garak</option>
          </select>
        </label>
        <br></br>
        <label>
          Select Client:
          <select style={{marginBottom: '7px'}} name="selectedServiceLevel">
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
          <select style={{marginBottom: '7px'}} name="selectedServiceLevel">
            <option value="Planning Only">Planning Only</option>
            <option value="Managed Portfolio">Managed Portfolio</option>
            <option value="Rebalancing Guidance">Rebalancing Guidance</option>
          </select>
        </label>
        <br></br>
        <label>
          Enter Start Date:
          <input style={{marginBottom: '7px'}} type="date" name="startDate"    required="required"/>
        </label>
        <br></br>
        <label>
          Enter End Date, if any:
          <input style={{marginBottom: '7px'}} type="date" name="endDate"/>
        </label>
        <br></br>
        <button style={{marginTop: '7px'}} type="submit">Add Assignment</button>
      </form>
    </div>
  )
>>>>>>> 667e7d0 (Updated CSS styling, changed UI elements within pages)
};

export default AssignmentsPage;