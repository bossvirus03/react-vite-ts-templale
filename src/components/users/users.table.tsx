import { useEffect, useState } from "react";
//import "../../styles/User.css";
import { Table, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';


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
    },
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <h2>TABLE USERS</h2>
      <div>
      <Button 
      type="primary" 
      icon={<PlusOutlined/>}
      onClick={showModal}>Add New</Button>
      </div>
      </div>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Table
        columns={columns}
        dataSource={listUsers}
        rowKey={"_id"}
      />
    </div>
  );
}

export default UsersTable;
