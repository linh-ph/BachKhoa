import React from "react";
import "./style.scss";
import { Layout, Menu, Row, Col, Avatar, Dropdown, Image } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { getUserById } from "../../slices/user";

const { Header } = Layout;

const currentUser = JSON.parse(sessionStorage.getItem("user"));

const TopBar = () => {
  const logout = () => {
    console.log(`logout!`);
  };

  const menu = (
    <Menu>
      <Menu.Item key="5">
        <NavLink
          to={`/${currentUser.name}/profile`}
          state={{ userId: currentUser.userId }}
        >
          <UserOutlined style={{ marginRight: 10 }} />
          Profile
        </NavLink>
      </Menu.Item>
      <Menu.Item key="6" danger onClick={logout}>
        <NavLink to="/confirm-signout">
          <LogoutOutlined style={{ marginRight: 10 }} />
          Sign out
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    // <Layout>
    <>
      <Header className="header">
        <Row>
          <Col span={3}>
            <div className="logo">
              <Image
                src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.png"
                width={100}
                preview={false}
              />
              <span style={{ marginLeft: 15 }}>SE WEBSITE</span>
            </div>
          </Col>

          <Col span={18}>
            <Row justify="center">
              <Menu
                className="top-bar-menu"
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                }}
                mode="horizontal"
                // defaultSelectedKeys={["3"]}
              >
                <Menu.Item key="1">
                  <NavLink to="/home">Dashboard</NavLink>
                </Menu.Item>

                <Menu.Item key="2">
                  <NavLink to="/courses">Courses</NavLink>
                </Menu.Item>

                <Menu.Item key="3">
                  <NavLink to="/blog">Blog</NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                  <NavLink to="/jobs">Jobs</NavLink>
                </Menu.Item>
              </Menu>
            </Row>
          </Col>
          <Col span={3}>
            <div className="user-link">
              {currentUser.image ? (
                <Avatar src={currentUser.image} />
              ) : (
                <Avatar icon={<UserOutlined />} />
              )}
              <Dropdown overlay={menu} placement="bottomCenter">
                <p style={{ fontWeight: 700 }}>{currentUser.name}</p>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Header>
    </>
    // </Layout>
  );
};

export default TopBar;
