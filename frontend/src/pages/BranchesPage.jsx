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
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Hawaii Branch</td>
            <td>Honolulu</td>
            <td>HI</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Massachusetts Branch</td>
            <td>Boston</td>
            <td>MA</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Oregon Branch</td>
            <td>Salem</td>
            <td>OR</td>
          </tr>
          <tr>
            <td>4</td>
            <td>New York Branch</td>
            <td>New York City</td>
            <td>NY</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

export default branchesPage;