import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Spin,
  //   InputNumber,
  //List
} from "antd";
import { LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
// import moment from "moment";
import { getDetailJob, applyJob } from "../../slices/job";
import { useNavigate, useParams } from "react-router-dom";
import UploadCV from "../uploadCV";

const currentUser = JSON.parse(sessionStorage.getItem("user"));

// const layout = {
//   labelCol: {
//     span: 10,
//   },
//   wrapperCol: {
//     span: 13,
//   },
// };
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    date: "${label} is not a valid date!",
    number: "${label} is not a valid number!",
    email: "${label} is not a valid email address!",
  },
  whitespace: "'${label}' cannot be empty",
  string: {
    max: "${label} cannot be longer than ${max} characters",
  },
};
/* eslint-enable no-template-curly-in-string */

const ApplyJobForm = () => {
  const { jobId } = useParams();
  // const [img, setImg] = useState("");
  // const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { detailJob, getDetailLoading, applyLoading, uploadResult } =
    useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getDetailJob(jobId));
  }, [dispatch, jobId]);

  const onFinish = (values) => {
    const data = {
      userId: currentUser.userId,
      recruitmentId: jobId,
      phoneNumber: values.phoneNumber,
      email: values.email,
      cvUrl: uploadResult.url ? uploadResult.url : null,
    };
    // console.log(data);
    dispatch(applyJob(data))
      .unwrap()
      .then(() => {
        message.success(`Send request to apply job success!`, 1).then(() => {
          navigate("/jobs");
        });
      })
      .catch((error) => {
        message.error(`Cannot send apply request...`);
        console.log(`SEND apply job request error ===>`, error);
      });
  };

  const handleBackClick = () => {
    navigate(`/job/${jobId}/detail`);
  };

  return !getDetailLoading ? (
    <div
      style={{
        padding: "30px 150px",
        backgroundColor: "#fff",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
      }}
    >
      <h1>Apply to {detailJob.recruitmentName}</h1>
      <Form
        // {...layout}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        // style={{
        //   width: 500,
        // }}
      >
        <Form.Item
          name="userName"
          label="Name:"
          initialValue={currentUser.name}
        >
          <Input disabled style={{ width: "60%" }} />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number:"
          rules={[
            {
              required: true,
              type: "string",
              max: 10,
              // whitespace: true,
            },
            {
              pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
              // eslint-disable-next-line no-template-curly-in-string
              message: "${label} is not a valid phone number!",
            },
          ]}
        >
          <Input
            placeholder="Input your phone number here"
            style={{ width: "60%" }}
          />
          {/* <InputNumber /> */}
        </Form.Item>
        <Form.Item
          name="email"
          label="Email Address:"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input
            placeholder="Input your email address here"
            style={{ width: "80%" }}
          />
        </Form.Item>
        <Form.Item name="cv" label="Your CV:">
          <UploadCV />
        </Form.Item>
        {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}> */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={applyLoading}
            icon={<SendOutlined />}
          >
            Send Apply Request
          </Button>
          <Button
            style={{ marginLeft: "30px", width: "100px" }}
            type="danger"
            ghost
            onClick={handleBackClick}
          >
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
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

export default ApplyJobForm;
