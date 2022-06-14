/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import "./style.scss";
import { uploadAvatar, resetUploadResult, editUser } from "../../slices/user";

const EditAccountForm = (props) => {
  const { userInfo } = props;

  const [defaultFileList, setDefaultFileList] = useState([]);
  const dispatch = useDispatch();
  const { uploadResult, editLoading } = useSelector((state) => state.user);

  const updateImage = (options) => {
    const { onSuccess, onError, file } = options;
    console.log(file.name);
    dispatch(uploadAvatar(file))
      .unwrap()
      .then(() => {
        message.success(`Upload image ${file.name} success!`);
        onSuccess("OK");
      })
      .catch((err) => {
        message.error("Cannot upload image...");
        onError({ err });
      });
  };

  const handleOnChange = ({ file, fileList, event }) => {
    setDefaultFileList(fileList);
  };

  const handleRemove = () => {
    dispatch(resetUploadResult());
  };

  const handleBeforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error(`${file.name} is not a png/jpeg file!`, 1.5);
    }

    return isJpgOrPng || Upload.LIST_IGNORE;
  };

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const data = {
      name: values.name,
      email: values.email,
      image: uploadResult ? uploadResult.url : userInfo.image,
    };

    dispatch(editUser({ id: userInfo.userId, data: data }))
      .unwrap()
      .then(() => {
        message.success("Edit account success!", 1.5).then(() => {
          window.location.reload();
        });
      })
      .catch((err) => {
        message.error("Cannot edit account...");
        console.log(`EDIT error ===> `, err);
      });
  };

  const handleChange = (changedValues, allValues) => {
    if (form.isFieldsTouched()) {
      setDisableButton(false);
    }
  };

  return (
    <div className="edit-account-container">
      <h1>User</h1>
      <Form
        // {...layout}
        form={form}
        onFinish={onFinish}
        onValuesChange={handleChange}
        layout="vertical"
        name="nest-messages"
        className="edit-form"
        // onFinish={onFinish}
        // validateMessages={validateMessages}
      >
        <Form.Item
          name="name"
          label="Name"
          initialValue={userInfo.name}
          rules={[
            {
              required: true,
              message: "'${label}' is required",
            },
            {
              max: 50,
              message: "'${label}' cannot be longer than ${max} characters",
            },
            {
              whitespace: true,
              message: "'${label}' cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Write your name here" style={{ height: 60 }} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          initialValue={userInfo.email}
          rules={[
            {
              required: true,
              message: "'${label}' is required",
            },
            {
              type: "email",
              message: "The input is not valid email!",
            },
            {
              max: 50,
              message: "'${label}' cannot be longer than ${max} characters",
            },
          ]}
        >
          <Input placeholder="Write your email here" style={{ height: 60 }} />
        </Form.Item>
        <Form.Item name="avatar" label="Avatar">
          <Upload
            listType="picture"
            accept="image/*"
            beforeUpload={handleBeforeUpload}
            customRequest={updateImage}
            onChange={handleOnChange}
            defaultFileList={defaultFileList}
            onRemove={handleRemove}
          >
            {defaultFileList.length >= 1 ? null : (
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            )}
          </Upload>
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "350px" }}
              loading={editLoading}
              disabled={disableButton}
            >
              Save Changes Account Information
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

export default EditAccountForm;
