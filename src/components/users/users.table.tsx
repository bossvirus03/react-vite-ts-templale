import { useEffect, useState } from "react";
import "../../styles/User.css";
interface IUsers
{
  email: string;
  username: string;
  role: string;
}
function UsersTable() {
  const [listUsers, setListUsers] = useState([]);
  useEffect(()=>{
    getData();
  },[])
  const getData =async () => {
    const responseLogin = await fetch("http://localhost:3000/auth/login",
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
  const dataUserLogin = await responseLogin.json();
  const refreshToken = dataUserLogin.data.access_token;
  const response = await fetch("http://localhost:3000/users",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${refreshToken}`
      },
    });
  const dataUser = await response.json();
  setListUsers(dataUser.data.result); 
  }
  console.log("check render listuser: ", listUsers);
  
  return (
    <div>
      <h2>TABLE USERS</h2>

      <table>
        <thead>
          <tr>
            <td>Email</td>
          <td>Name</td>
          <td>Role</td>
          </tr>
          
        </thead>
        <tbody>
        {listUsers.map((user: IUsers, index)=>{
          return (
          <tr key={index}>
          <td>{user.email}</td>
          <td>{user.username}</td>
          <td>{user.role}</td>
        </tr>)
          
        })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
