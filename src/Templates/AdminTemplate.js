import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import "antd/dist/antd.css";
import {
  Layout,
  Menu,
  Breadcrumb,
  Space,
  Button,
  Avatar,
  Dropdown,
  message,
} from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { LogoutAction } from "../redux/actions/UserActions";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const AdminTemplate = (props) => {
  // const user = useSelector((state) => state.UserReducer.userLogin);
  //const user = JSON.parse(localStorage.getItem("USER_LOGIN"));
  const dispatch = useDispatch();
  const user = useSelector(state => state.UserReducer.userLogin);
  console.log("tên dang nhập", user);
  const [state, setState] = useState({
    collapsed: false,
  });
  const handleMenuClick =async (e) =>{
    if (e.key === '1') {
      message.info("Quay về trang chủ ...");
    } else {

dispatch(await LogoutAction());
      
    }
    console.log("click", e.key);
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <NavLink to="/home">Trang chủ</NavLink>
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        <NavLink to="/home">Đăng xuất</NavLink>
      </Menu.Item>
    </Menu>
  );

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setState({ collapsed });
  };
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider
                collapsible
                collapsed={state.collapsed}
                onCollapse={onCollapse}
              >
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <div className="pt-5 pb-5 text-center">
                    <img
                      style={{ borderRadius: "50%" }}
                      src="../image/logo1.png"
                    />
                    {!state.collapsed ? (
                      <div
                        className="mt-3 font-weight-bold"
                        style={{ fontSize: "1.5rem", color: "yellow" }}
                      >
                        Cybersoft
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <Menu.Item key="9" icon={<HomeOutlined />}>
                    <NavLink to="/home">Trang chủ</NavLink>
                  </Menu.Item>

                  <SubMenu
                    key="sub1"
                    icon={<VideoCameraOutlined />}
                    title="Phim"
                  >
                    <Menu.Item key="3">
                      <NavLink to="/admin/quanlyphim">Quản lý phim</NavLink>
                    </Menu.Item>
                    <Menu.Item key="4">Thêm phim mới</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    icon={<TeamOutlined />}
                    title="Thành viên"
                  >
                    <Menu.Item key="6">
                      <NavLink to="/admin/quanlynguoidung">Danh sách</NavLink>
                    </Menu.Item>
                    <Menu.Item key="8">Thêm người dùng</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{
                    textAlign: "right",
                    backgroundColor: "white",
                    margin: "0 16px",
                  }}
                >
                  <Space align="center">
                    <Avatar
                      style={{
                        backgroundColor: "#87d068",
                      }}
                      icon={<UserOutlined />}
                    />
                    <Dropdown overlay={menu}>
                      <Button style={{ border: "none" }}>
                        <span style={{ fontSize: "1.5rem" }}>
                          {user.taiKhoan}
                          {/* {console.log("taikhoan", localStorage.getItem("USER_LOGIN")}} */}
                        </span>
                      </Button>
                    </Dropdown>
                  </Space>
                </Header>

                <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Admin</Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <NavLink to="/admin/quanlyphim">{props.to}</NavLink>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <div
                    className="site-layout-background"
                    style={{
                      padding: 24,
                      minHeight: 360,
                      backgroundColor: "white",
                    }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Ant Design ©2018 Created by Ant UED
                </Footer>
              </Layout>
            </Layout>
          </>
        );
      }}
    />
  );
};
