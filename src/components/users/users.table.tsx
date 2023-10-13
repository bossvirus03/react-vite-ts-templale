import { useEffect, useState } from "react";
//import "../../styles/User.css";
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';


interface IUsers
{
  email: string;
  username: string;
  role: string;
}
const columns : ColumnsType<IUsers> = [
  {
    title: "Email",
    dataIndex: "email",
    render: (value, record) => {
      return (<a>{record.email}</a>)
    }
  },
  {
    title: "Name",
    dataIndex: "username",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
]
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
      <Table
        columns={columns}
        dataSource={listUsers}
      />
    </div>
  );
}

export default UsersTable;
