function AssignmentsPage(){
  return(
    <div classname = 'assignmentsTable' style={{ padding: "20px"}}>
      <h1>Adivsor-Client Assignments</h1>

      <table border="3" style={{marginTop: "15px"}}>
        <thead>
          <tr>
            <th>Assignment ID</th>
            <th>Advisor Name</th>
            <th>Client Name</th>
            <th>Service Level</th>
            <th>Relationship Start Date</th>
            <th>Relationship End Date</th>
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
          </tr>
          <tr>
            <td>2</td>
            <td>Benjamin Sisko</td>
            <td>Montgomery Scott</td>
            <td>Managed Portfolio</td>
            <td>2025-04-23</td>
            <td>2025-07-12</td>
          </tr>
          <tr>
            <td>3</td>
            <td>James Kirk</td>
            <td>Hikaru Sulu</td>
            <td>Planning Only</td>
            <td>2025-03-21</td>
            <td>2025-07-18</td>
          </tr>
          <tr>
            <td>4</td>
            <td>James Kirk</td>
            <td>Pavel Chekov</td>
            <td>Managed Portfolio</td>
            <td>2025-03-12</td>
            <td>Ongoing</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Jean-Luc Picard</td>
            <td>Willian Riker</td>
            <td>Planning Only</td>
            <td>2025-04-22</td>
            <td>Ongoing</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Jean-Luc Picard</td>
            <td>Deanna Troi</td>
            <td>Rebalancing Guideance</td>
            <td>2025-08-19</td>
            <td>Ongoing</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Jean-Luc Picard</td>
            <td>Geordi La Forge</td>
            <td>Managed Portfolio</td>
            <td>2025-09-03</td>
            <td>Ongoing</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Jonathan Archer</td>
            <td>Geordi La Forge</td>
            <td>Rebalancing Guideance</td>
            <td>2025-12-04</td>
            <td>Ongoing</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Benjamin Sisko</td>
            <td>Jadzia Dax</td>
            <td>Rebalancing Guideance</td>
            <td>2025-06-04</td>
            <td>2025-06-07</td>
          </tr>
          <tr>
            <td>10</td>
            <td>Benjamin Sisko</td>
            <td>Kira Nerys</td>
            <td>Planning Only</td>
            <td>2025-07-25</td>
            <td>2025-10-29</td>
          </tr>
          <tr>
            <td>11</td>
            <td>Kathryn Janeway</td>
            <td>Thomas Paris</td>
            <td>Managed Portfolio</td>
            <td>2025-01-17</td>
            <td>2025-04-10</td>
          </tr>
          <tr>
            <td>12</td>
            <td>Kathryn Janeway</td>
            <td>Harry Kim</td>
            <td>Planning Only</td>
            <td>2025-04-03</td>
            <td>2025-09-16</td>
          </tr>
          <tr>
            <td>13</td>
            <td>James Kirk</td>
            <td>Thomas Paris</td>
            <td>Rebalancing Guideance</td>
            <td>2025-04-08</td>
            <td>Ongoing</td>
          </tr>
          <tr>
            <td>14</td>
            <td>James Kirk</td>
            <td>Harry Kim</td>
            <td>Managed Portfolio</td>
            <td>2025-08-09</td>
            <td>Ongoing</td>
          </tr>
          <tr>
            <td>15</td>
            <td>Jonathan Archer</td>
            <td>Charles Tucker</td>
            <td>Planning Only</td>
            <td>2025-02-13</td>
            <td>Ongoing</td>
          </tr>
          <tr>
            <td>16</td>
            <td>Jonathan Archer</td>
            <td>Hoshi Sato</td>
            <td>Rebalancing Guideance</td>
            <td>2025-04-09</td>
            <td>Ongoing</td>
          </tr>
          <tr>
            <td>17</td>
            <td>Jean-Luc Picard</td>
            <td>Hoshi Sato</td>
            <td>Rebalancing Guideance</td>
            <td>2025-04-05</td>
            <td>2025-04-09</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

export default AssignmentsPage;