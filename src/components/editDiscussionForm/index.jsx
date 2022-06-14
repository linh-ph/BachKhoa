import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  message,
  Spin,
  //   Select,
  //List
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  editDiscussion,
  getDetailDiscussion,
  setDiscussContent,
} from "../../slices/discussion";
import { useNavigate, useLocation } from "react-router-dom";
import EditDiscussContentEditor from "../editDiscussContentEditor";

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
  whitespace: "'${label}' cannot be empty",
  string: {
    max: "${label} cannot be longer than ${max} characters",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const EditDiscussionForm = () => {
  // const [img, setImg] = useState("");
  // const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(location);

  const { editLoading, discussContent, detailDiscussion, getDetailLoading } =
    useSelector((state) => state.discussion);

  useEffect(() => {
    dispatch(getDetailDiscussion(location.state.discussId));
    dispatch(setDiscussContent(""));
  }, [dispatch, location.state.discussId]);

  const onFinish = (values) => {
    const newTopic = {
      discussionTitle: values.discussionTitle,
      discussDate: values.discussDate,
      discussionContent: discussContent
        ? discussContent
        : detailDiscussion.discussionContent,
      status: detailDiscussion.status,
      subjectId: detailDiscussion.subjectId,
      userId: currentUser.userId,
    };
    console.log(newTopic);
    dispatch(editDiscussion({ id: location.state.discussId, data: newTopic }))
      .unwrap()
      .then(() => {
        message
          .success(`Edit topic success!`, 1.5)
          .then(() => navigate(`/home`));
      })
      .catch((error) => {
        message.error(`Cannot edit topic...`);
        console.log(`ADD topic error ===>`, error);
      });
  };

  return !getDetailLoading ? (
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
              whitespace: true,
            },
          ]}
          initialValue={detailDiscussion.discussionTitle}
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
          initialValue={moment(detailDiscussion.discussDate)}
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
          <EditDiscussContentEditor
            content={detailDiscussion.discussionContent}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={editLoading}>
            Edit Topic
          </Button>
          <Button
            style={{ marginLeft: "30px", width: "100px" }}
            type="danger"
            ghost
            onClick={() => navigate(`/home`)}
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

export default EditDiscussionForm;
