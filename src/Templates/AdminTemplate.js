import React, { useState } from "react";
import { NavLink, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb, Space, Button, Avatar } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const AdminTemplate = (props) => {
  const [state, setState] = useState({
    collapsed: false,
  });

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
                  <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{ textAlign: "right" }}
                >
                  <Space align="center">
                    <Avatar
                      style={{
                        backgroundColor: "#87d068",
                      }}
                      icon={<UserOutlined />}
                    />
                    <span style={{ fontSize: "1.5rem", color: "blue" }}>
                      Phanthanhchi
                    </span>
                  </Space>
                </Header>

                <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 360 }}
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
