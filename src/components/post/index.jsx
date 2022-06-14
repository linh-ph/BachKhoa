import React from "react";
import { Card, Col, Typography, Row, Avatar, Tag, Tooltip } from "antd";
import {
  UserOutlined,
  HeartOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
// import { getUserById } from "../../slices/user";

const { Meta } = Card;
const { Title } = Typography;

const Post = (props) => {
  const { post, loading } = props;
  // const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);
  const { blogType } = useSelector((state) => state.blog);

  // const getUser = useCallback(() => {

  // }, [dispatch, post.userId]);

  // useEffect(() => {
  //   dispatch(getUserById(post.userId));
  // }, [dispatch, post.userId]);

  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.name !== "p") {
        // const props = attributesToProps(domNode.attribs);
        // const nodeData = domNode.children;
        // nodeData.forEach((element) => {
        //   element.type === "text" &&
        //     element.data !== " " &&
        //     console.log(element.data);
        // });
        return <></>;
        // console.log(props.hasOwnProperty("src"));
      }

      // if (domNode.attribs && domNode.name === "p") {
      //   const nodeData = domNode.children;
      //   nodeData.forEach((element) => {
      //     if (element.type === "text") {
      //       if (element.data.trim().length > 1) {
      //         console.log(element.data);
      //         return <>{element.data}</>;
      //       }
      //     }
      //   });
      //   // return domNode;
      // }
    },
    trim: true,
  };

  const postType = blogType.find((element) => element.id === post.postType);
  const ownerPost = allUsers.find((element) => element.userId === post.userId);

  return (
    <Col span={24} style={{ margin: "20px 0" }}>
      {/* <Skeleton loading={loading} active> */}

      <Card
        className="blog-card"
        // title={blog.postName}
        loading={loading}
        bordered={false}
        style={{ width: "100%" }}
        bodyStyle={{
          minHeight: "150px",
        }}
        // cover={<img alt={blog.imageLabel} src={blog.image} />}
      >
        {/* <p>Date: {moment(blog.postDate).format("DD-MM-YYYY")}</p>
          <p>Content: {blog.postContent}</p> */}
        <Row justify="space-between" wrap={false}>
          <Col
            // span={16}
            flex="auto"
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
                    to={`/blog/${post.postId}/detail`}
                    // state={{ userId: post.userId }}
                    className="post-link"
                  >
                    {post.postName}
                  </NavLink>
                </Title>
              }
              description={
                <div className="post-description">
                  {parse(
                    typeof post.postContent === "string"
                      ? post.postContent
                      : "",
                    options
                  )}
                </div>
              }
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
                  {ownerPost && (
                    <>
                      {ownerPost.image ? (
                        <Avatar src={ownerPost.image} />
                      ) : (
                        <Avatar icon={<UserOutlined />} />
                      )}
                    </>
                  )}
                  <span style={{ marginLeft: 10, fontWeight: 700 }}>
                    {ownerPost ? ownerPost.name : "Unknown"}
                  </span>
                </div>
                <span>
                  <i>{`Posted on ${moment(post.postDate).format(
                    "MMM D YYYY"
                  )}`}</i>
                </span>
                <span style={{ fontWeight: 700 }}>
                  {postType ? (
                    <Tag
                      color={postType.typeName === "Blog" ? "blue" : "volcano"}
                    >
                      {`#${postType.typeName}`}
                    </Tag>
                  ) : null}
                </span>
                <span>
                  <Tooltip placement="bottom" title="Likes" arrowPointAtCenter>
                    <HeartOutlined /> {post.totalLike}
                  </Tooltip>
                </span>
                <span>
                  <Tooltip
                    placement="bottom"
                    title="Comments"
                    arrowPointAtCenter
                  >
                    <CommentOutlined /> {post.totalComment}
                  </Tooltip>
                </span>
              </Col>
            </Row>
          </Col>
          <Col>
            <img height={170} src={post.postImage} alt={post.postImage} />
          </Col>
        </Row>
      </Card>

      {/* </Skeleton> */}
    </Col>
  );
};

export default Post;
