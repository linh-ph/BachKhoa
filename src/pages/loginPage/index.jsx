import React from "react";
// import { NavLink } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPortrait, faLock } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { loginAuth } from "../../slices/login";
// import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./login.css";

const LoginPage = () => {
  //   const navigate = useNavigate();
  const history = createBrowserHistory();
  //   const [showForgotPassword, setShowForgotPassword] = useState(false);

  const dispatch = useDispatch();
  const { loginLoading } = useSelector((state) => state.login);

  const onFinish = (values) => {
    console.log(values);
    const data = {
      username: values.username,
      password: values.password,
    };
    dispatch(loginAuth(data))
      .unwrap()
      .then(() => {
        message.success("Login success!");

        // navigate("/home");
        history.push("/blog");
        window.location.reload();
      })
      .catch((error) => {
        message.error("Login failed...");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="login-page">
        <div className="login-page-logo">
          {/* <img
            src="https://bizweb.dktcdn.net/100/349/716/themes/736844/assets/logo.png?1632128644916"
            alt="logo"
            style={{
              width: 200,
            }}
          /> */}
        </div>
        <div className="login-main">
          <div className="login-main-title">
            <h1>LOGIN PAGE</h1>
            <p></p>
          </div>
          <Form
            name="login-form"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              // label="ID"
              name="username"
              rules={[
                {
                  required: true,
                  message: "please input username!",
                },
              ]}
            >
              <Input
                placeholder="username"
                prefix={
                  <FontAwesomeIcon
                    icon={faPortrait}
                    style={{ color: "gray", marginRight: 10 }}
                  />
                }
                // size="middle"
                style={{ height: 50, borderRadius: 10, fontSize: "16px" }}
              />
            </Form.Item>

            <Form.Item
              // label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "please input password!",
                },
              ]}
            >
              <Input.Password
                placeholder="password"
                prefix={
                  <FontAwesomeIcon
                    icon={faLock}
                    style={{ color: "gray", marginRight: 10 }}
                  />
                }
                // size="middle"
                style={{ height: 50, borderRadius: 10 }}
              />
            </Form.Item>
            {/* <div className="forgot-password">
              <NavLink
                to="/forgot-password"
                style={{ color: "gray" }}
                // onClick={() => setShowForgotPassword(true)}
              >
                forgot password?
              </NavLink>
            </div> */}
            <Form.Item>
              <Button
                // type="primary"

                htmlType="submit"
                style={{
                  width: 350,
                  height: 50,
                  marginTop: 10,
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: 10,
                }}
                loading={loginLoading}
              >
                <span style={{ fontWeight: 700 }}>Login</span>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
