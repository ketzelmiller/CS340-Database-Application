
function ServiceLevelsPage(){

<<<<<<< HEAD
=======
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
          <tr>
            <td>1</td>
            <td>Planning Only</td>
            <td>Low-Level planning guidance. Advisors assist in creating estate plans, developing tax-advantaged investment vehicles, and the creation of new accounts.</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Managed Portfolio</td>
            <td>High-Level portfolio management. Assets are controlled by the advisor who makes decisions and takes action on the clients'' behalf to maximize either rate of return, income, or protection of principal.</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Rebalancing Guidance</td>
            <td>Intermediate-level portfolio overviews. Advisors discuss portfolio weights and assist clients in adjusting their asset mixes based on risk tolerance and prevailing market conditions.</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
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
>>>>>>> 667e7d0 (Updated CSS styling, changed UI elements within pages)
};

export default ServiceLevelsPage;