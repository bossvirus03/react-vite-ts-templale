import { Modal, Input, notification, Form, Select, InputNumber } from "antd";
import { IUsers } from "./users.table";

interface IProps {
  accessToken: string;
  getData: () => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

function CreateUserModal(props: IProps) {
  const [form] = Form.useForm();

  const { Option } = Select;
  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
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
  const onFinish = (value: IUsers) => {
    addUser(value);
  };
  return (
    <Modal
      title="Add new user"
      open={isCreateModalOpen}
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
          <Input.Password />
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
      {/* <div>
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
      </div> */}
    </Modal>
  );
}

export default CreateUserModal;
