import { useEffect, useState } from "react";
//import "../../styles/User.css";
import { Table, Button, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import CreateUserModal from "./create.user.modal";
import UpdateUserModal from "./update.user.modal";

export interface IUsers {
  _id?: string;
  email: string;
  username: string;
  password: string;
  gender: string;
  age: string;
  address: string;
  role: string;
}

function UsersTable() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null);
  const [listUsers, setListUsers] = useState([]);
  const columns: ColumnsType<IUsers> = [
    {
      title: "Email",
      dataIndex: "email",
      render: (value, record) => {
        return <a>{record.email}</a>;
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
    {
      title: "Actions",
      render: (value, record) => {
        return (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsUpdateModalOpen(true);
              setDataUpdate(record);
            }}
          />
        );
      },
    },
  ];
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvc3N2aXJ1czAzIiwiZW1haWwiOiJuZ3V5ZW5sb2lAZ21haWwuY29tIiwiX2lkIjoiNjUyNmYxYzhmMDllYjE1ZDk1OTU1NjMwIiwicm9sZSI6IlVTRVIiLCJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiaWF0IjoxNjk3MTkwNjQ4LCJleHAiOjE2OTgwNTQ2NDh9.-HJBrmfmDpAFqvvIwZW9arYN1dW_CgJRHmtZcfETUfg";
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const dataUser = await response.json();
    if (!dataUser.data) {
      notification.error({
        message: "Có lỗi xảy ra",
        description: dataUser?.message || "Vui lòng đăng nhập lại!",
      });
    }
    setListUsers(dataUser.data.result);
    return dataUser.data._id;
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>TABLE USERS</h2>
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add New
          </Button>
        </div>
      </div>
      <CreateUserModal
        accessToken={accessToken}
        getData={getData}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <UpdateUserModal
        accessToken={accessToken}
        getData={getData}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
      <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />
    </div>
  );
}

export default UsersTable;
