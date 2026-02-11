function ClientsPage(){
  return(
    <div classname = 'advisorsTable' style={{ padding: "20px"}}>
      <h1>Clients</h1>

      <table border="3" style={{marginTop: "15px"}}>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Montgomery</td>
            <td>Scott</td>
            <td>montgomeryscott@gmail.com</td>
            <td>1920-03-03</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Hikaru</td>
            <td>Sulu</td>
            <td>hikarusulu@gmail.com</td>
            <td>1937-04-20</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Pavel</td>
            <td>Chekov</td>
            <td>pavelchekov@gmail.com</td>
            <td>1936-09-14</td>
          </tr>
          <tr>
            <td>4</td>
            <td>William</td>
            <td>Riker</td>
            <td>williamtriker@gmail.com</td>
            <td>1952-08-19</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Deanna</td>
            <td>Troi</td>
            <td>deannatroi@gmail.com</td>
            <td>1955-03-29</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Geordi</td>
            <td>La Forge</td>
            <td>geordilaforge@gmail.com</td>
            <td>1957-02-16</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Jadzia</td>
            <td>Dax</td>
            <td>jadziadax@gmail.com</td>
            <td>1963-11-19</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Kira</td>
            <td>Nerys</td>
            <td>kiranerys@gmail.com</td>
            <td>1957-07-26</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Thomas</td>
            <td>Paris</td>
            <td>tomparis@gmail.com</td>
            <td>1964-11-09</td>
          </tr>
          <tr>
            <td>10</td>
            <td>Harry</td>
            <td>Kim</td>
            <td>harrykim@gmail.com</td>
            <td>1968-12-15</td>
          </tr>
          <tr>
            <td>11</td>
            <td>Charles</td>
            <td>Tucker</td>
            <td>charlestucker@gmail.com</td>
            <td>1969-03-19</td>
          </tr>
          <tr>
            <td>12</td>
            <td>Hoshi</td>
            <td>Sato</td>
            <td>hoshisato@gmail.com</td>
            <td>1978-07-09</td>
          </tr>
          <tr>
            <td>13</td>
            <td>Ro</td>
            <td>Laren</td>
            <td>rolaren@gmail.com</td>
            <td>1965-01-08</td>
          </tr>
          <tr>
            <td>14</td>
            <td>Winn</td>
            <td>Adami</td>
            <td>winnadami@gmail.com</td>
            <td>1934-07-22</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

export default ClientsPage;