function AdvisorsPage(){
  return(
    <div classname = 'advisorsTable' style={{ padding: "20px"}}>
      <h1>Advisors</h1>

      <table border="3" style={{marginTop: "15px"}}>
        <thead>
          <tr>
            <th>Advisor ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Branch</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>James</td>
            <td>Kirk</td>
            <td>jamestkirk@gmail.com</td>
            <td>Massachusetts Branch</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jean-Luc</td>
            <td>Picard</td>
            <td>jeanlucpicard@gmail.com</td>
            <td>Oregon Branch</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Benjamin</td>
            <td>Sisko</td>
            <td>bensisko@gmail.com</td>
            <td>New York Branch</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Kathryn</td>
            <td>Janeway</td>
            <td>kathrynjaneway@gmail.com</td>
            <td>Massachusetts Branch</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Jonathan</td>
            <td>Archer</td>
            <td>jonathanarcher@gmail.com</td>
            <td>New York Branch</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Elim</td>
            <td>Garak</td>
            <td>elimgarak@gmail.com</td>
            <td>New York Branch</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

export default AdvisorsPage;