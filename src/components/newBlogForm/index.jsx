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
import { addBlog, getAllBlogType } from "../../slices/blog";
import { useNavigate } from "react-router-dom";
import UploadImage from "../uploadImage";
import PostContentEditor from "../postContentEditor";

const { Option } = Select;

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
    string: "${label}' is not a valid string!",
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

const AddNewBlogForm = () => {
  // const [img, setImg] = useState("");
  // const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    result,
    addLoading,
    blogType,
    getTypeLoading,
    uploadResult,
    // uploadLoading,
    newPostContent,
  } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogType());
  }, [dispatch]);

  // function handleUploadFile(e) {
  //   // File
  //   const image = e.target.files[0];

  //   dispatch(uploadImage(image))
  //     .unwrap()
  //     .then(() => {
  //       message.success("Upload image success!");
  //     })
  //     .catch(() => {
  //       message.error("Cannot upload image...");
  //     });

  //   console.log(image);
  // }

  const onFinish = (values) => {
    const post = {
      postName: values.post.postName,
      postImage: uploadResult ? uploadResult.url : null,
      postDate: moment(values.post.postDate).format("YYYY-MM-DD"),
      postContent: newPostContent,
      postType: values.post.postType,
      status: 1,
      userId: currentUser.userId,
    };
    console.log(post);
    dispatch(addBlog(post))
      .unwrap()
      .then(() => {
        console.log(`result:`, result);
        message
          .success(`Add new blog success!`, 2.5)
          .then(() => message.loading(`Waiting for admin to review...`, 2.5));

        navigate("/blog");
      })
      .catch((error) => {
        message.error(`Cannot add new blog...`);
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
          name={["post", "postName"]}
          label="Post Name:"
          rules={[
            {
              required: true,
              type: "string",
              max: 100,
            },
          ]}
        >
          <Input placeholder="Write your post title here" />
        </Form.Item>
        <Form.Item
          name={["post", "postDate"]}
          label="Post Create Date:"
          rules={[
            {
              required: true,
              type: "date",
            },
          ]}
        >
          <DatePicker
            style={{ width: "300px" }}
            placeholder="Select create post date"
          />
        </Form.Item>
        <Form.Item
          name={["post", "postImage"]}
          label="Cover Image (png/jpeg file):"
        >
          {/* <Input style={{ width: "30%" }} /> */}
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "space-between",
            }}
          >
            <input
              type="file"
              accept="image/*"
              id="upload"
              onChange={(e) => handleUploadFile(e)}
            />

            {uploadResult === null ? (
              <label htmlFor="upload"></label>
            ) : (
              <>
                {uploadLoading ? (
                  <label>Loading</label>
                ) : (
                  <label
                    htmlFor="upload"
                    style={{ backgroundColor: "#ff1",  }}
                  >{`(!url: [${uploadResult.url}])`}</label>
                )}
              </>
            )}
          </div> */}
          <UploadImage />
        </Form.Item>
        <Form.Item
          name={["post", "postType"]}
          label="Post Type:"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select style={{ width: "30%" }} placeholder="Select post type">
            {getTypeLoading ? null : (
              <>
                {blogType.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.typeName}
                  </Option>
                ))}
              </>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          name={["post", "postContent"]}
          label="Post Contents:"
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
          <PostContentEditor />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={addLoading}>
            Create New Post
          </Button>
          <Button
            style={{ marginLeft: "30px", width: "100px" }}
            type="danger"
            ghost
            onClick={() => navigate("/blog")}
          >
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewBlogForm;
