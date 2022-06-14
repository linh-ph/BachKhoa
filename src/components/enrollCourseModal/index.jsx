import React from "react";
import { Modal, Form, Input, message } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setEnrollModal,
  enrollSubject,
  getDetailSubject,
} from "../../slices/subject";

const currentUser = JSON.parse(sessionStorage.getItem("user"));

const EnrollCourseModal = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { enrollModal, detailSubject, enrollLoading } = useSelector(
    (state) => state.subjects
  );

  const handleCancel = () => {
    console.log("Cancel clicked!");
    dispatch(setEnrollModal(false));
  };

  return (
    <Modal
      title={`Enroll ${detailSubject.subjectName}`}
      visible={enrollModal}
      onCancel={handleCancel}
      okText="Enroll Me"
      confirmLoading={enrollLoading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            const data = {
              password: values.enrollPassword,
              subjectId: detailSubject.subjectId,
              userId: currentUser.userId,
            };
            dispatch(enrollSubject(data))
              .unwrap()
              .then(() => {
                message
                  .success(`Enroll ${detailSubject.subjectName} success!`, 2.5)
                  .then(() => {
                    dispatch(setEnrollModal(false));
                    dispatch(getDetailSubject(detailSubject.subjectId));
                  });
              })
              .catch((error) => {
                message.error(
                  `Cannot enroll ${detailSubject.subjectName}...`,
                  2.5
                );
              });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="horizontal" name="form_in_modal">
        <Form.Item
          name="enrollPassword"
          label="Enroll Password:"
          rules={[
            {
              required: true,
              message: "Password is required!",
            },
          ]}
        >
          <Input.Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EnrollCourseModal;
