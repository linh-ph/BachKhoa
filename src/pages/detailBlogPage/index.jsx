import React, { useEffect, useCallback, useState } from "react";
import {
  useParams,
  //  useLocation
} from "react-router-dom";
// import HTMLReactParser from "html-react-parser";
import parse, { attributesToProps } from "html-react-parser";
import {
  Row,
  Col,
  Typography,
  Spin,
  Avatar,
  Tag,
  Button,
  Divider,
  Input,
  List,
  message,
} from "antd";
import {
  LoadingOutlined,
  UserOutlined,
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  getDetailBlog,
  getAllBlogType,
  reactPost,
  getPostComments,
  checkLikeStatusPost,
} from "../../slices/blog";
import { getUserById, getAllUsers, commentPost } from "../../slices/user";
import "./style.scss";
import Comment from "../../components/comment";

const { Paragraph } = Typography;
const { TextArea } = Input;

const currentUser = JSON.parse(sessionStorage.getItem("user"));

const DetailBlogPage = () => {
  const { postId } = useParams();
  const [commentContent, setCommentContent] = useState("");

  const dispatch = useDispatch();
  // const location = useLocation();
  // console.log(`location`, location.state);

  const {
    detailBlog,
    getDetailLoading,
    // reactResult,
    blogType,
    comments,
    checkLikePost,
    getCommentLoading,
    // checkLoading,
  } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.user);
  const { commentLoading } = useSelector((state) => state.user);

  const getData = useCallback(() => {
    dispatch(getAllBlogType());
    dispatch(
      checkLikeStatusPost({ postId: postId, userId: currentUser.userId })
    );
    dispatch(getDetailBlog(postId))
      .then(() => {
        dispatch(getUserById(detailBlog.userId));
      })
      .catch((err) => console.log(err));
    dispatch(getPostComments(postId));
    dispatch(getAllUsers());
  }, [dispatch, postId, detailBlog.userId]);

  useEffect(() => {
    getData();
  }, [getData]);

  const postType = blogType.find(
    (element) => element.id === detailBlog.postType
  );

  const handleReactPost = () => {
    // console.log("like clicked!");
    dispatch(reactPost({ postId: postId, userId: currentUser.userId }))
      .unwrap()
      .then(() => {
        dispatch(
          checkLikeStatusPost({ postId: postId, userId: currentUser.userId })
        );
      })
      .catch((err) => {
        console.log(`LIKE post err ===>`, err);
      });
  };

  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.name === "img") {
        const props = attributesToProps(domNode.attribs);
        //scale image
        if (props && props.hasOwnProperty("width")) {
          props.width = "800";
        }

        if (props && props.hasOwnProperty("height")) {
          props.height = "auto";
        }
        // console.log(props);
        return <img alt="" {...props} />;
        // console.log(props.hasOwnProperty("src"));
      }
    },
  };

  const handleComment = () => {
    const data = {
      postId: postId,
      userId: currentUser.userId,
      content: commentContent,
    };
    dispatch(commentPost(data))
      .unwrap()
      .then(() => {
        message.success("Add comment success!", 2);
        setCommentContent("");
        dispatch(getPostComments(postId));
      })
      .catch((err) => {
        console.log("Cannot add comment...", 2);
        setCommentContent("");
        console.log(`err add comment ===>`, err);
      });
  };

  return !getDetailLoading ? (
    <Row justify="center">
      <Col
        span={14}
        // style={{
        //   minWidth: 500,
        // }}
      >
        {/* <Skeleton active loading={getDetailLoading}> */}
        <div className="detail-blog">
          <div style={{ padding: "10px 0" }}>
            <Row justify="center" style={{ marginTop: "20px" }}>
              <Col span={22}>
                <Row align="middle">
                  <Col>
                    {user.image ? (
                      <Avatar size={40} src={user.image} />
                    ) : (
                      <Avatar size={40} icon={<UserOutlined />} />
                    )}
                  </Col>
                  <Col>
                    <span style={{ margin: 10, fontWeight: 700 }}>
                      {user.name}
                    </span>
                    <i>{`Posted on ${moment(detailBlog.postDate).format(
                      "MMM D YYYY"
                    )}`}</i>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={22}>
                <h1>{detailBlog.postName}</h1>
                <p className="post-tag">
                  <>
                    {postType ? (
                      <Tag
                        color={
                          postType.typeName === "Blog" ? "blue" : "volcano"
                        }
                      >{`#${postType.typeName}`}</Tag>
                    ) : null}
                  </>
                </p>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={22}>
                {/* <div>{parse(detailBlog.postContent)}</div> */}
                <Paragraph>
                  {parse(
                    typeof detailBlog.postContent === "string"
                      ? detailBlog.postContent
                      : "",
                    options
                  )}
                </Paragraph>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={22}>
                {checkLikePost ? (
                  <Button
                    type="text"
                    className="btn-like"
                    icon={<HeartFilled className="like-icon liked" />}
                    onClick={handleReactPost}
                  >
                    Liked
                  </Button>
                ) : (
                  <Button
                    type="text"
                    className="btn-like"
                    icon={<HeartOutlined className="like-icon" />}
                    onClick={handleReactPost}
                  >
                    Like
                  </Button>
                )}
                {/* <Button
                  type="text"
                  className="btn-like"
                  icon={
                    reactResult === "Liked" ? (
                      <HeartFilled className="like-icon liked" />
                    ) : reactResult === "Unliked" ? (
                      <HeartOutlined className="like-icon" />
                    ) : (
                      <HeartOutlined className="like-icon" />
                    )
                  }
                  onClick={handleReactPost}
                >
                  {reactResult === "Liked"
                    ? "Liked"
                    : reactResult === "Unliked"
                    ? "Like"
                    : "Like"}
                </Button> */}
              </Col>
            </Row>
            <Divider></Divider>
            <Row justify="center">
              <Col span={22}>
                <h1 style={{ margin: 0 }}>Comments</h1>
                <div className="comment-area">
                  <div className="add-comment">
                    {currentUser.image ? (
                      <Avatar size={40} src={currentUser.image} />
                    ) : (
                      <Avatar size={40} icon={<UserOutlined />} />
                    )}
                    <TextArea
                      // allowClear={true}
                      placeholder="Write your comment here..."
                      rows={4}
                      // onPressEnter={handleComment}
                      value={commentContent}
                      onChange={(e) => {
                        setCommentContent(e.target.value);
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div className="comment-btn">
                      <Button
                        type="primary"
                        icon={<CommentOutlined />}
                        onClick={handleComment}
                        loading={commentLoading}
                      >
                        Submit Comment
                      </Button>
                      <Button onClick={() => setCommentContent("")}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                  <div>
                    {!getCommentLoading ? (
                      <List
                        itemLayout="horizontal"
                        dataSource={comments}
                        renderItem={(item) => (
                          <List.Item>
                            <Comment comment={item} />
                          </List.Item>
                        )}
                      />
                    ) : (
                      <div className="course-loading">
                        <Spin
                          size="large"
                          tip="Loading..."
                          style={{ color: "gray" }}
                          indicator={<LoadingOutlined spin />}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/* </Skeleton> */}
      </Col>
    </Row>
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

export default DetailBlogPage;
