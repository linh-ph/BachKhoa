import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  message,
  //   Select,
  //List
} from "antd";
import { useSelector, useDispatch } from "react-redux";
// import moment from "moment";
import { addNewDiscussion } from "../../slices/discussion";
import { useNavigate, useLocation } from "react-router-dom";
import DiscussContentEditor from "../discussContentEditor";

const currentUser = JSON.parse(sessionStorage.getItem("user"));

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
  string: {
    max: "${label} cannot be longer than ${max} characters",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const NewDiscussionForm = () => {
  // const [img, setImg] = useState("");
  // const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { addLoading, discussContent } = useSelector(
    (state) => state.discussion
  );

  const onFinish = (values) => {
    const newTopic = {
      discussionTitle: values.discussionTitle,
      discussDate: values.discussDate,
      postContent: discussContent,
      status: 2,
      subjectId: location.state.id,
      userId: currentUser.userId,
    };
    console.log(newTopic);
    dispatch(addNewDiscussion(newTopic))
      .unwrap()
      .then(() => {
        message
          .success(`Add new topic success!`, 1.5)
          .then(() => navigate(`/courses/${location.state.id}/detail`));
      })
      .catch((error) => {
        message.error(`Cannot add new topic...`);
        console.log(`ADD topic error ===>`, error);
      });
  };

  return (
    <div
      style={{
        padding: "30px",
        marginTop: "50px",
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
          name="discussionTitle"
          label="Topic Title:"
          rules={[
            {
              required: true,
              max: 100,
            },
          ]}
        >
          <Input placeholder="Write your topic title here" />
        </Form.Item>
        <Form.Item
          name="discussDate"
          label="Topic Create Date:"
          rules={[
            {
              required: true,
              type: "date",
            },
          ]}
        >
          <DatePicker
            style={{ width: "300px" }}
            placeholder="Select create date"
          />
        </Form.Item>
        <Form.Item
          name="discussionContent"
          label="Topic Contents:"
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
          <DiscussContentEditor />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={addLoading}>
            Create New Topic
          </Button>
          <Button
            style={{ marginLeft: "30px", width: "100px" }}
            type="danger"
            ghost
            onClick={() => navigate(`/courses/${location.state.id}/detail`)}
          >
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewDiscussionForm;
