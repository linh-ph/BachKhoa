/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import "./style.scss";
import { changePassword } from "../../slices/user";

const ChangePasswordForm = (props) => {
  const { userInfo } = props;

  const dispatch = useDispatch();
  const { changePassLoading } = useSelector((state) => state.user);

  const [form] = Form.useForm();

  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const data = {
      password: values.password,
      userId: userInfo.userId,
    };
    dispatch(changePassword({ id: userInfo.userId, data: data }))
      .unwrap()
      .then(() => {
        message.success("Set new password success!", 1.5).then(() => {
          window.location.reload();
        });
      })
      .catch((err) => {
        message.error("Cannot set new password ...");
        console.log(`CHANGE pass error ===> `, err);
      });
  };

  return (
    <div className="edit-account-container">
      <h1>Set new password</h1>
      <Form
        // {...layout}
        form={form}
        onFinish={onFinish}
        layout="vertical"
        name="nest-messages"
        className="edit-form"
        // onFinish={onFinish}
        // validateMessages={validateMessages}
      >
        <Form.Item
          name="password"
          label="New Password"
          // initialValue={}
          rules={[
            {
              required: true,
              message: "'${label}' is required",
            },
            {
              max: 50,
              message: "'${label}' cannot be longer than ${max} characters",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your new password here"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          rules={[
            {
              required: true,
              message: "'${label}' is required",
            },
            {
              max: 50,
              message: "'${label}' cannot be longer than ${max} characters",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          {/* <Input.TextArea
            rows={10}
            placeholder="Write your post contents here"
          /> */}
          {/* <EditPostContentEditor content={detailBlog.postContent} /> */}
          <Input.Password
            placeholder="Confirm your new password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "300px" }}
              loading={changePassLoading}
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Set New Password
            </Button>
          )}

          {/* <Button
            style={{ marginLeft: "30px", width: "100px" }}
            type="danger"
            ghost
          >
            Back
          </Button> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
