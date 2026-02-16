// Citation for the following function:
// Date: 2/16/2026
// Adapted from
// Source URL: https://www.youtube.com/watch?v=dYjdzpZv5yc and react documentation at https://react.dev

function branchesPage(){
  return(
    <div classname = 'branchesTable' style={{ padding: "20px"}}>
      <h1>Branches</h1>

      <table border="3" style={{marginTop: "15px"}}>
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

        <tbody>
          <tr>
            <td>1</td>
            <td>Hawaii Branch</td>
            <td>Honolulu</td>
            <td>HI</td>
            <td><button type="submit">Update</button></td>
            <td><button type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Massachusetts Branch</td>
            <td>Boston</td>
            <td>MA</td>
            <td><button type="submit">Update</button></td>
            <td><button type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Oregon Branch</td>
            <td>Salem</td>
            <td>OR</td>
            <td><button type="submit">Update</button></td>
            <td><button type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>4</td>
            <td>New York Branch</td>
            <td>New York City</td>
            <td>NY</td>
            <td><button type="submit">Update</button></td>
            <td><button type="submit">Delete</button></td>
          </tr>
        </tbody>
      </table>

      <hr></hr>

      <h2>Insert Branch</h2>
      <form>
        <input type="text"   name="branchName" required="required" placeholder="Enter branch name"/>
        <br></br>
        <input type="text"   name="city"       required="required" placeholder="Enter city"/>
        <br></br>
        <label>
          Select State:
          <select name="selectedState">
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
            <option value="CZ">CZ</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="DC">DC</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="GU">GU</option>
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
        <button type="submit">Add Branch</button>
      </form>
    </div>
  )
};

export default branchesPage;