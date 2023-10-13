import { Modal, Input, notification } from "antd";
import { useState, useEffect } from "react";
import { IUsers } from "./users.table";

interface IProps {
  accessToken: string;
  getData: () => void;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataUpdate: null | IUsers;
  setDataUpdate: (v: null | IUsers) => void;
}

function UpdateUserModal(props: IProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const handleCloseCreateModal = () => {
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
    setUsername("");
    setEmail("");
    setPassword("");
    setAge("");
    setGender("");
    setAddress("");
    setRole("");
  };

  const {
    accessToken,
    getData,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    dataUpdate,
    setDataUpdate,
  } = props;
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
  useEffect(() => {
    if (dataUpdate) {
      setUsername(dataUpdate.username);
      setEmail(dataUpdate.email);
      setPassword(dataUpdate.password);
      setAge(dataUpdate.age);
      setGender(dataUpdate.gender);
      setAddress(dataUpdate.address);
      setRole(dataUpdate.role);
    }
  }, [dataUpdate]);
  const addUser = async (data: IUsers) => {
    if (dataUpdate) {
      const res = await fetch(`http://localhost:3000/users/${dataUpdate._id}`, {
        method: "PATCH",
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
          message: "Update User thành công!",
          description: d.message,
        });
        setIsUpdateModalOpen(false);
      } else {
        notification.error({
          message: "Có lỗi xảy ra!",
          description: d.message,
        });
      }
    }
  };

  return (
    <Modal
      title="Update new user"
      open={isUpdateModalOpen}
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

export default UpdateUserModal;
