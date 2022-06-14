import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  message,
  Select,
  //List
  Spin,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { editPost, getAllBlogType, getDetailBlog } from "../../slices/blog";
import { useNavigate, useLocation } from "react-router-dom";
import UploadImage from "../uploadImage";
import EditPostContentEditor from "../editPostContentEditor";

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

const EditPostForm = () => {
  // const [img, setImg] = useState("");
  // const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(location.state);
  const {
    result,
    editLoading,
    blogType,
    detailBlog,
    getTypeLoading,
    getDetailLoading,
    uploadResult,
    // uploadLoading,
    newPostContent,
  } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getDetailBlog(location.state.id));
    dispatch(getAllBlogType());
  }, [dispatch, location.state.id]);

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
      postImage: uploadResult ? uploadResult.url : detailBlog.postImage,
      postDate: moment(values.post.postDate).format("YYYY-MM-DD"),
      postContent: newPostContent ? newPostContent : detailBlog.postContent,
      postType: values.post.postType,
      status: detailBlog.status,
      userId: currentUser.userId,
    };
    console.log(post);
    dispatch(editPost({ data: post, id: location.state.id }))
      .unwrap()
      .then(() => {
        console.log(`result:`, result);
        message
          .success(`Edit blog success!`, 2.5)
          .then(() => navigate("/blog"));
      })
      .catch((error) => {
        message.error(`Cannot edit blog...`);
        console.log(`EDIT blog error ===>`, error);
      });
  };

  return !getDetailLoading ? (
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
          initialValue={detailBlog.postName}
          rules={[
            {
              required: true,
              max: 100,
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Write your post title here" />
        </Form.Item>
        <Form.Item
          name={["post", "postDate"]}
          label="Post Create Date:"
          initialValue={moment(detailBlog.postDate)}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker
            style={{ width: "300px" }}
            placeholder="Select create post date"
            // defaultValue={moment(detailBlog.postDate)}
          />
        </Form.Item>
        <Form.Item name={["post", "postImage"]} label="Cover Image:">
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
          initialValue={detailBlog.postType}
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
          <EditPostContentEditor content={detailBlog.postContent} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={editLoading}>
            Edit Post
          </Button>
          <Button
            style={{ marginLeft: "30px", width: "100px" }}
            type="danger"
            ghost
            onClick={() => navigate("/home")}
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

export default EditPostForm;
