import { Modal, Input, notification } from "antd";
import { useState } from "react";
import { IUsers } from "./users.table";

interface IProps {
  accessToken: string;
  getData: () => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

function CreateUserModal(props: IProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setAge("");
    setGender("");
    setAddress("");
    setRole("");
  };
  const handleOk = () => {
    const data = {
      username,
      email,
      password,
      age,
      gender,
      address,
      role,
    };
    addUser(data);
  };

  const { accessToken, getData, isCreateModalOpen, setIsCreateModalOpen } =
    props;
  const addUser = async (data: IUsers) => {
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const d = await res.json();
    if (d.data) {
      getData();
      notification.success({
        message: "Tạo mới User thành công!",
        description: d.message,
      });
      setIsCreateModalOpen(false);
    } else {
      notification.error({
        message: "Có lỗi xảy ra!",
        description: d.message,
      });
    }
  };

  return (
    <Modal
      title="Add new user"
      open={isCreateModalOpen}
      onOk={handleOk}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <div>
        <label>username:</label>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>email:</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>password:</label>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>age:</label>
        <Input value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div>
        <label>gender:</label>
        <Input value={gender} onChange={(e) => setGender(e.target.value)} />
      </div>
      <div>
        <label>address</label>
        <Input value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div>
        <label>role:</label>
        <Input value={role} onChange={(e) => setRole(e.target.value)} />
      </div>
    </Modal>
  );
}

export default CreateUserModal;
