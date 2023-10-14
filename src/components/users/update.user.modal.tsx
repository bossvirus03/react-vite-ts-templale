import { Modal, Input, notification, Form, Select, InputNumber } from "antd";
import { useEffect } from "react";
import { IUsers } from "./users.table";

const { Option } = Select;

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
  const [form] = Form.useForm();
  const handleCloseCreateModal = () => {
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
  };

  const {
    accessToken,
    getData,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    dataUpdate,
    setDataUpdate,
  } = props;
  const onFinish = (value: IUsers) => {
    addUser(value);
  };
  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        username: dataUpdate.username,
        email: dataUpdate.email,
        password: dataUpdate.password,
        gender: dataUpdate.gender,
        address: dataUpdate.address,
        age: dataUpdate.age,
        role: dataUpdate.role,
      });
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
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password disabled={dataUpdate ? true : false} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input your age!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please input your gender!" }]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please input your role!" }]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="ADMIN">ADMIN</Option>
            <Option value="USER">USER</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateUserModal;
