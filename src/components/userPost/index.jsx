import React from "react";
import {
  Card,
  Col,
  Typography,
  Row,
  //   Avatar,
  Tag,
  Button,
  Menu,
  Dropdown,
  Modal,
  message,
} from "antd";
import {
  //   UserOutlined,
  HeartOutlined,
  CommentOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { deletePost, getPostByUserId } from "../../slices/blog";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postStatus } from "../../utils/constant";

const { Meta } = Card;
const { Title } = Typography;
const { confirm } = Modal;

const currentUser = JSON.parse(sessionStorage.getItem("user"));

const UserPost = (props) => {
  const { userPost } = props;

  const dispatch = useDispatch();

  // const { deleteLoading } = useSelector((state) => state.blog);

  const status = postStatus.find((element) => element.id === userPost.status);

  const handleMenuClick = (value) => {
    if (value.key === "3") {
      confirm({
        content: "Are you sure to delete this post?",
        okText: "Yes, delete it",
        cancelText: "Cancel",
        onOk() {
          dispatch(deletePost(userPost.postId))
            .unwrap()
            .then(() =>
              message
                .success("Delete post success!", 1.5)
                .then(() => dispatch(getPostByUserId(currentUser.userId)))
            )
            .catch((err) => {
              message.error("Cannot delete post...", 1.5);
              console.log(err);
            });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <NavLink to={`/edit-blog`} state={{ id: userPost.postId }}>
          Edit Post
        </NavLink>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" danger>
        Delete Post
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      className="blog-card user-post"
      // title={blog.postName}
      //   loading={loading}
      bordered={false}
      style={{ width: "100%" }}
      bodyStyle={{
        minHeight: "150px",
      }}
      // cover={<img alt={blog.imageLabel} src={blog.image} />}
    >
      {/* <p>Date: {moment(blog.postDate).format("DD-MM-YYYY")}</p>
    <p>Content: {blog.postContent}</p> */}
      <Row justify="space-between">
        <Col
          span={18}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            // overflow: "hidden",
          }}
        >
          <Meta
            title={
              <Title
                level={3}
                style={{
                  margin: "0",
                  // overflow: "auto",
                  whiteSpace: "normal",
                }}
              >
                <NavLink
                  to={`/blog/${userPost.postId}/detail`}
                  // state={{ userId: post.userId }}
                  className="post-link"
                >
                  {userPost.postName}
                </NavLink>
              </Title>
            }
            // description={`Posted on ${moment(post.postDate).format(
            //   "MMM D YYYY"
            // )} (${moment(post.postDate).startOf("day").fromNow()})`}
          />
          <Row>
            <Col
              span={16}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* <Avatar icon={<UserOutlined />} /> */}
                <Dropdown overlay={menu}>
                  <Button
                    icon={<EllipsisOutlined />}
                    onClick={(e) => e.preventDefault()}
                  ></Button>
                </Dropdown>
                <span style={{ marginLeft: 10, fontWeight: 600 }}>
                  {/* {ownerPost ? ownerPost.name : "Unknown"} */}
                </span>
              </div>
              <span>
                <i>{`Posted on ${moment(userPost.postDate).format(
                  "MMM D YYYY"
                )}`}</i>
              </span>
              <span style={{ fontWeight: 700 }}>
                {/* {postType ? (
                  <Tag
                    color={postType.typeName === "Blog" ? "blue" : "volcano"}
                  >
                    {`#${postType.typeName}`}
                  </Tag>
                ) : null} */}
              </span>
              <span>
                <HeartOutlined /> {userPost.totalLike}
              </span>
              <span>
                <CommentOutlined /> {userPost.totalComment}
              </span>
              <span>
                {status ? (
                  <Tag
                    color={
                      status.id === 1
                        ? `volcano`
                        : status.id === 2
                        ? `green`
                        : `red`
                    }
                  >
                    {status.value}
                  </Tag>
                ) : null}
              </span>
            </Col>
          </Row>
        </Col>
        <Col>
          <img height={100} src={userPost.postImage} alt={userPost.postImage} />
        </Col>
      </Row>
    </Card>
  );
};

export default UserPost;
