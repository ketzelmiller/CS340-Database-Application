import { Link } from "react-router-dom";

function AdvisorsPage(){
  return(
    <div classname = 'advisorsTable' style={{ padding: "20px"}}>
      <h1>Advisors</h1>

      <table border="3" style={{marginTop: "15px"}}>
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
          </tr>
          <tr>
            <td>Jean-Luc</td>
            <td>Picard</td>
            <td>3</td>
            <td>jeanlucpicard@gmail.com</td>
          </tr>
          <tr>
            <td>Benjamin</td>
            <td>Sisko</td>
            <td>4</td>
            <td>bensisko@gmail.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

export default AdvisorsPage;