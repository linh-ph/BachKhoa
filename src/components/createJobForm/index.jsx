import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  message,
  Select,
  //List
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getAllCompany, addNewJob } from "../../slices/job";
import { useNavigate } from "react-router-dom";
import UploadImage from "../uploadImage";
import JobContentEditor from "../jobContentEditor";

const { Option } = Select;

// const currentUser = JSON.parse(sessionStorage.getItem("user"));

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 13,
  },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    date: "${label} is not a valid date!",
    number: "${label} is not a valid number!",
  },
  whitespace: "'${label}' cannot be empty",
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
  string: {
    max: "'${label}' cannot be longer than ${max} characters",
  },
};
/* eslint-enable no-template-curly-in-string */

const CreateJobForm = () => {
  // const [img, setImg] = useState("");
  // const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uploadResult } = useSelector((state) => state.blog);

  const { newJobContent, addLoading } = useSelector((state) => state.job);

  const { companies, getAllCompanyLoading } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getAllCompany());
  }, [dispatch]);

  const onFinish = (values) => {
    const newJob = {
      recruitmentName: values.newJob.newJobTitle,
      recruitmentImage: uploadResult ? uploadResult.url : null,
      dateCreated: moment(values.newJob.newJobCreateDate).format("YYYY-MM-DD"),
      recruitmentContent: newJobContent,
      companyId: values.newJob.companyId,
    };
    // console.log(newJob);
    dispatch(addNewJob(newJob))
      .unwrap()
      .then(() => {
        message.success(`Add new job success!`, 2.5);

        navigate("/jobs");
      })
      .catch((error) => {
        message.error(`Cannot add new job...`);
        console.log(`ADD blog error ===>`, error);
      });
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#fff",
      }}
    >
      <Form
        // {...layout}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["newJob", "newJobTitle"]}
          label="Job Title:"
          rules={[
            {
              required: true,
              max: 100,
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Write your job title here" />
        </Form.Item>
        <Form.Item
          name={["newJob", "newJobCreateDate"]}
          label="Job Create Date:"
          rules={[
            {
              required: true,
              type: "date",
            },
          ]}
        >
          <DatePicker
            style={{ width: "300px" }}
            placeholder="Select create job date"
          />
        </Form.Item>
        <Form.Item name={["newJob", "newJobImage"]} label="Cover Image:">
          <UploadImage />
        </Form.Item>
        <Form.Item
          name={["newJob", "companyId"]}
          label="Company:"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select style={{ width: "30%" }} placeholder="Select company">
            {getAllCompanyLoading ? null : (
              <>
                {companies.map((item) => (
                  <Option key={item.companyId} value={item.companyId}>
                    {item.companyName}
                  </Option>
                ))}
              </>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          name={["newJob", "newJobContents"]}
          label="Job Contents:"
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
        >
          {/* <Input.TextArea
            rows={10}
            placeholder="Write your post contents here"
          /> */}
          <JobContentEditor />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={addLoading}>
            Create New Job
          </Button>
          <Button
            style={{ marginLeft: "30px", width: "100px" }}
            type="danger"
            ghost
            onClick={() => navigate("/jobs")}
          >
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateJobForm;
