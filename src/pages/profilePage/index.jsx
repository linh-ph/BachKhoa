import React, { useEffect, useCallback } from "react";
import {
  // useParams,
  useLocation,
} from "react-router-dom";
import { Row, Col, Spin, Avatar, Button, message, Modal } from "antd";
import {
  LoadingOutlined,
  MailOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { getUserById, deleteUser } from "../../slices/user";
import EditAccountForm from "../../components/editAccountForm";
import ChangePasswordForm from "../../components/changePasswordForm";

const { confirm } = Modal;

const ProfilePage = () => {
  const location = useLocation();
  const { userId } = location.state;

  // const [visibility, setVisibility] = useState("hidden");

  const dispatch = useDispatch();

  const { user, getLoading } = useSelector((state) => state.user);

  const getData = useCallback(() => {
    dispatch(getUserById(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    getData();
  }, [getData]);

  // const handleClick = () => {
  //   if (visibility === "hidden") {
  //     setVisibility("visible");
  //   } else {
  //     setVisibility("hidden");
  //   }
  // };

  const handleDelete = () => {
    confirm({
      title: "Are you sure delete your account?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteUser(userId))
          .unwrap()
          .then(() => {
            message.success("Delete account success!", 1.5).then(() => {
              message.info("Logging out..., Goodbye...", 1.5);
              sessionStorage.removeItem("user");
              window.location.reload();
            });
          })
          .catch((err) => {
            message.error("Cannot delete account...");
            console.log(`DELETE account err ===>`, err);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return !getLoading ? (
    <>
      <Row justify="center">
        <Col span={16}>
          <div className="profile">
            {user.image ? (
              <Avatar
                size={200}
                // icon={<UserOutlined />}
                src={user.image}
                className="profile-avatar"
              />
            ) : (
              <Avatar
                size={200}
                icon={<UserOutlined />}
                // src={user.image}
                className="profile-avatar"
              />
            )}

            <div className="profile-background"></div>
            <div className="profile-detail-container">
              <Row justify="end">
                <Col span={19}>
                  <div className="profile-detail">
                    <Row justify="space-between">
                      <Col>
                        <span className="name">{user.name}</span>
                      </Col>
                      {/* <Col>
                        <Button
                          type="primary"
                          className="edit-btn"
                          icon={<EditOutlined />}
                          onClick={handleClick}
                        >
                          Edit Account
                        </Button>
                      </Col> */}
                    </Row>
                    <Row>
                      <Col>
                        <div className="email">
                          <MailOutlined />
                          <span style={{ marginLeft: 10 }}>{user.email}</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={16}>
          <div
            id="edit-account"
            style={{
              // visibility: visibility,
              borderRadius: "20px",
              border: "1px solid rgb(223, 223, 223)",
            }}
          >
            <EditAccountForm userInfo={user} />
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={16}>
          <div
            id="edit-account"
            style={{
              // visibility: visibility,
              borderRadius: "20px",
              border: "1px solid rgb(223, 223, 223)",
            }}
          >
            <ChangePasswordForm userInfo={user} />
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={16}>
          <div
            id="edit-account"
            style={{
              // visibility: visibility,
              borderRadius: "20px",
              border: "1px solid rgb(223, 223, 223)",
            }}
          >
            <div className="danger-zone">
              <h1>Danger Zone</h1>
              <h2>Delete Account</h2>
              <ul>
                <li>
                  Delete your profile, along with your authentication
                  associations.
                </li>
                <li>
                  Delete any and all content you have, such as posts, comments,
                  or your subjects list.
                </li>
                <li>Allow your username to become available to anyone.</li>
              </ul>
              <Button
                type="danger"
                className="delete-btn"
                onClick={handleDelete}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  ) : (
    <div className="course-loading">
      <Spin
        size="large"
        tip="Loading..."
        style={{ color: "gray" }}
        indicator={<LoadingOutlined spin />}
      />
    </div>
  );
};

export default ProfilePage;
