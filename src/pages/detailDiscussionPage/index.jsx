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
  //   Tag,
  Button,
  Divider,
  Input,
  List,
  message,
} from "antd";
import {
  LoadingOutlined,
  UserOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  getDetailDiscussion,
  getCommentDiscussion,
} from "../../slices/discussion";
import { getUserById, getAllUsers, commentDiscussion } from "../../slices/user";
import "./style.scss";
import CommentDiscuss from "../../components/commentDiscuss";

const { Paragraph } = Typography;
const { TextArea } = Input;

const currentUser = JSON.parse(sessionStorage.getItem("user"));

const DetailDiscussionPage = () => {
  const { discussionId } = useParams();
  const [commentContent, setCommentContent] = useState("");

  const dispatch = useDispatch();
  // const location = useLocation();
  // console.log(`location`, location.state);

  const {
    detailDiscussion,
    getDetailLoading,
    discussComments,
    getCommentLoading,
  } = useSelector((state) => state.discussion);
  const { user, commentLoading } = useSelector((state) => state.user);

  const getData = useCallback(() => {
    dispatch(getDetailDiscussion(discussionId))
      .then(() => {
        dispatch(getUserById(detailDiscussion.userId));
      })
      .catch((err) => console.log(err));
    dispatch(getCommentDiscussion(discussionId));
    dispatch(getAllUsers());
  }, [dispatch, discussionId, detailDiscussion.userId]);

  useEffect(() => {
    getData();
  }, [getData]);

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
      discussionId: discussionId,
      userId: currentUser.userId,
      content: commentContent,
    };
    dispatch(commentDiscussion(data))
      .unwrap()
      .then(() => {
        message.success("Add comment success!", 2);
        setCommentContent("");
        dispatch(getCommentDiscussion(discussionId));
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
                    <i>{`Posted on ${moment(
                      detailDiscussion.discussDate
                    ).format("MMM D YYYY")}`}</i>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={22}>
                <h1>{detailDiscussion.discussionTitle}</h1>
              </Col>
            </Row>
            <Row justify="center" style={{ marginTop: 50 }}>
              <Col span={22}>
                {/* <div>{parse(detailBlog.postContent)}</div> */}
                <Paragraph>
                  {parse(
                    typeof detailDiscussion.discussionContent === "string"
                      ? detailDiscussion.discussionContent
                      : "",
                    options
                  )}
                </Paragraph>
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
                        dataSource={discussComments}
                        renderItem={(item) => (
                          <List.Item>
                            <CommentDiscuss key={item.id} comment={item} />
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

export default DetailDiscussionPage;
