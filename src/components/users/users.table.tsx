import { useEffect, useState } from "react";
//import "../../styles/User.css";
import { Table, Button, notification, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CreateUserModal from "./create.user.modal";
import UpdateUserModal from "./update.user.modal";
const accessToken = localStorage.getItem("access_token") as string;
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
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 1,
    total: 100,
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null);
  const [listUsers, setListUsers] = useState([]);

  const getData = async () => {
    const response = await fetch(
      `http://localhost:3000/users?page=${meta.current}&limit=${meta.pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const dataUser = await response.json();
    if (!dataUser.data) {
      notification.error({
        message: "Có lỗi xảy ra",
        description: dataUser?.message || "Vui lòng đăng nhập lại!",
      });
    }
    setListUsers(dataUser.data.result);
    setMeta({
      current: dataUser.data.meta.current,
      pageSize: dataUser.data.meta.pageSize,
      pages: dataUser.data.meta.pages,
      total: dataUser.data.meta.total,
    });
  };
  const handleOnChange = async (page: number, pageSize: number) => {
    const response = await fetch(
      `http://localhost:3000/users?page=${page}&limit=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const dataUser = await response.json();
    if (!dataUser.data) {
      notification.error({
        message: "Có lỗi xảy ra",
        description: dataUser?.message || "Vui lòng đăng nhập lại!",
      });
    }
    setListUsers(dataUser.data.result);
    setMeta({
      current: dataUser.data.meta.current,
      pageSize: dataUser.data.meta.pageSize,
      pages: dataUser.data.meta.pages,
      total: dataUser.data.meta.total,
    });
  };
  const confirm = async (user: IUsers) => {
    const res = await fetch(`http://localhost:3000/users/${user._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    getData();
    if (res) {
      message.success("Deleted a User");
    } else {
      message.error("Có lỗi xảy ra");
    }
  };
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
          <>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setIsUpdateModalOpen(true);
                setDataUpdate(record);
              }}
            />
            <Popconfirm
              title="Delete a user"
              description={`Bạn có chắc muốn xóa người dùng ${record.username}`}
              onConfirm={() => confirm(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{ marginLeft: "20px" }}
                type="primary"
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    getData();
  }, []);
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
      <Table
        columns={columns}
        dataSource={listUsers}
        rowKey={"_id"}
        pagination={{
          current: meta.current,
          total: meta.total,
          pageSize: meta.pageSize,
          onChange: (page: number, pageSize: number) =>
            handleOnChange(page, pageSize),
          pageSizeOptions: [5, 10, 20, 100],
          showSizeChanger: true,
        }}
      />
    </div>
  );
}

export default UsersTable;
