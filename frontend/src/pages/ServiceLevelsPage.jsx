function ServiceLevelsPage(){
  return(
    <div classname = 'serviceLevelsTable' style={{ padding: "20px"}}>
      <h1>Service Levels</h1>

      <table border="3" style={{marginTop: "15px"}}>
        <thead>
          <tr>
            <th>Service Level ID</th>
            <th>Service Level Name</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Planning Only</td>
            <td>Low-Level planning guidance. Advisors assist in creating estate plans, developing tax-advantaged investment vehicles, and the creation of new accounts.</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Managed Portfolio</td>
            <td>High-Level portfolio management. Assets are controlled by the advisor who makes decisions and takes action on the clients'' behalf to maximize either rate of return, income, or protection of principal.</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Rebalancing Guidance</td>
            <td>Intermediate-level portfolio overviews. Advisors discuss portfolio weights and assist clients in adjusting their asset mixes based on risk tolerance and prevailing market conditions.</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

export default ServiceLevelsPage;