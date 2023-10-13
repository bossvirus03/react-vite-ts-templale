import { useEffect, useState } from "react";
//import "../../styles/User.css";
import { Table, Button, Modal, Input, notification  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';


interface IUsers
{
  email: string;
  username: string;
  password: string;
  gender: string;
  age: string;
  address: string;
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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const handleCloseCreateModal = () => {
    setIsModalOpen(false);
    setUsername("")
setEmail("")
setPassword("")
setAge("")
setGender("")
setAddress("")
setRole("")
  }
  const handleOk = () => {
    const data ={
      username,
      email,
      password,
      age, 
      gender, 
      address,
      role
    }
    addUser(data);
  };
  const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvc3N2aXJ1czAzIiwiZW1haWwiOiJuZ3V5ZW5sb2lAZ21haWwuY29tIiwiX2lkIjoiNjUyNmYxYzhmMDllYjE1ZDk1OTU1NjMwIiwicm9sZSI6IlVTRVIiLCJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiaWF0IjoxNjk3MTkwNjQ4LCJleHAiOjE2OTgwNTQ2NDh9.-HJBrmfmDpAFqvvIwZW9arYN1dW_CgJRHmtZcfETUfg"
  const [listUsers, setListUsers] = useState([]);
  const addUser = async (data:IUsers) => {
    const res = await fetch("http://localhost:3000/users",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${refreshToken}`
      },
    });
    const d = await res.json();
    if(d.data){
      getData();
      notification.success({
        message: "Tạo mới User thành công!",
        description: d.message,
      });
      setIsModalOpen(false);
    }else{
      notification.error({
        message: "Có lỗi xảy ra!",
        description: d.message,
      })
    }
  }
  useEffect(()=>{
    getData();
  },[])
  const getData =async () => {
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
      onClick={()=>setIsModalOpen(true)}>Add New</Button>
      </div>
      </div>
      <Modal 
      title="Add new user" 
      open={isModalOpen} 
      onOk={handleOk} 
      onCancel={()=>handleCloseCreateModal()}
      maskClosable={false}
      >
        <div>
          <label>username:</label>
          <Input 
          value={username}
          onChange={(e)=> setUsername(e.target.value)}/>
        </div>
        <div>
          <label>email:</label>
          <Input
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>password:</label>
          <Input 
          value={password}
          onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <div>
          <label>age:</label>
          <Input 
          value={age}
          onChange={(e)=> setAge(e.target.value)}/>
        </div>
        <div>
          <label>gender:</label>
          <Input 
          value={gender}
          onChange={(e)=> setGender(e.target.value)}/>
        </div>
        <div>
          <label>address</label>
          <Input value={address}
          onChange={(e)=> setAddress(e.target.value)}/>
        </div>
        <div>
          <label>role:</label>
          <Input value={role}
          onChange={(e)=> setRole(e.target.value)}/>
        </div>
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
