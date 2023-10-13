import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Link } from "react-router-dom";
import UsersPage from "./screen/Users.page.tsx";
import { UsergroupDeleteOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, notification } from "antd";
const items: MenuProps["items"] = [
  {
    label: <Link to={""}>Home</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/users">Manager Users</Link>,
    key: "users",
    icon: <UsergroupDeleteOutlined />,
  },
];
const Header = () => {
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const getData = async () => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "bossvirus03",
        password: "123456",
      }),
    });
    const dataLogin = await response.json();

    if (dataLogin.data) {
      localStorage.setItem("access_token", dataLogin.data.access_token);
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: dataLogin?.message || "Vui lòng đăng nhập lại!",
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

const LayoutAdmin = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <footer>footer</footer>
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <App /> }, //khi vao trang home "/"
      {
        path: "/users",
        element: <UsersPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
