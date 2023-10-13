import { useEffect } from "react";
import "../../styles/User.css";
function UsersTable() {
  useEffect(()=>{
    console.log("check useEffect")
    getData();
  },[])
  const getData =async () => {
    const response = await fetch("http://localhost:3000/auth/login",
    {
      method: "POST",
      body: JSON.stringify({
        username: "bossvirus03",
        password: "123456"
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  const dataUser = await response.json();
  console.log(dataUser); 
  const refreshToken = dataUser.data.access_token;
  const response1 = await fetch("http://localhost:3000/users",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${refreshToken}`
      },
    });
  const dataUser1 = await response1.json();
  console.log(dataUser1); 
  }
  console.log("check render")
  return (
    <div>
      <h2>HTML Table</h2>

      <table>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
      </table>
    </div>
  );
}

export default UsersTable;
