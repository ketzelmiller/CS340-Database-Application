import { Link } from "react-router-dom";

function AdvisorsPage(){
  return(
    <div style={{ padding: "20px"}}>
      <h1>Advisors</h1>

      <table className="advisor-table" border="3" style={{marginTop: "15px"}}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Branch</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>James</td>
            <td>Kirk</td>
            <td>2</td>
            <td>jamestkirk@gmail.com</td>
<<<<<<< HEAD
=======
            <td>Massachusetts Branch</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
>>>>>>> 667e7d0 (Updated CSS styling, changed UI elements within pages)
          </tr>
          <tr>
            <td>Jean-Luc</td>
            <td>Picard</td>
            <td>3</td>
            <td>jeanlucpicard@gmail.com</td>
<<<<<<< HEAD
=======
            <td>Oregon Branch</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
>>>>>>> 667e7d0 (Updated CSS styling, changed UI elements within pages)
          </tr>
          <tr>
            <td>Benjamin</td>
            <td>Sisko</td>
<<<<<<< HEAD
            <td>4</td>
            <td>bensisko@gmail.com</td>
          </tr>
        </tbody>
      </table>
=======
            <td>bensisko@gmail.com</td>
            <td>New York Branch</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Kathryn</td>
            <td>Janeway</td>
            <td>kathrynjaneway@gmail.com</td>
            <td>Massachusetts Branch</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>5</td>
            <td>Jonathan</td>
            <td>Archer</td>
            <td>jonathanarcher@gmail.com</td>
            <td>New York Branch</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
          <tr>
            <td>6</td>
            <td>Elim</td>
            <td>Garak</td>
            <td>elimgarak@gmail.com</td>
            <td>New York Branch</td>
            <td><button className='update-button' type="submit">Update</button></td>
            <td><button className='delete-button' type="submit">Delete</button></td>
          </tr>
        </tbody>
      </table>

      <hr></hr>

      <h2>Insert Advisor</h2>
      <form>
        <input style={{marginBottom: '7px', padding:'7px'}} type="text" name="firstName"   required="required" placeholder="Enter first name"/>
        <br></br>
        <input style={{marginBottom: '7px', padding:'7px'}} type="text" name="lastName"    required="required" placeholder="Enter last name"/>
        <br></br>
        <input style={{marginBottom: '7px', padding:'7px'}} type="text" name="email"       required="required" placeholder="Enter email"/>
        <br></br>
        <label>
          Select Branch:
          <select style={{marginLeft:'5px'}} name="selectedBranch">
            <option value="Hawaii Branch">Hawaii Branch</option>
            <option value="Massachusetts Branch">Massachusetts Branch</option>
            <option value="Oregon Branch">Oregon Branch</option>
            <option value="New York Branch">New York Branch</option>
          </select>
        </label>
        <br></br>
        <button style={{marginTop: '8px', padding:'8px'}} type="submit">Add Advisor</button>
      </form>
>>>>>>> 667e7d0 (Updated CSS styling, changed UI elements within pages)
    </div>
  )
};

export default AdvisorsPage;