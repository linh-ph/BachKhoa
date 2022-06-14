import React, { useEffect } from "react";
import { Row, Col, Avatar, Dropdown, Menu, Tag, message, Modal } from "antd";
import moment from "moment";
import {
  UserOutlined,
  CommentOutlined,
  MoreOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getCommentDiscussion,
  changeStatusDiscussion,
  getDiscussionBySubjectId,
} from "../../slices/discussion";
import {
  NavLink,
  //  useLocation
} from "react-router-dom";
import "./style.scss";
import { userRole, postStatus } from "../../utils/constant";

const currentUser = JSON.parse(sessionStorage.getItem("user"));
const { confirm } = Modal;

const Discussion = (props) => {
  const { discussion } = props;

  const dispatch = useDispatch();

  const { discussComments, changeStatusLoading } = useSelector(
    (state) => state.discussion
  );
  const { allUsers } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCommentDiscussion(discussion.discussionId));
  }, [dispatch, discussion.discussionId]);

  const ownerDiscuss = allUsers.find(
    (element) => element.userId === discussion.userId
  );

  const status = postStatus.find((element) => element.id === discussion.status);

  const handleMenuOnClick = (item) => {
    if (item.key === "1") {
      const data = {
        discussDate: discussion.discussDate,
        discussionContent: discussion.discussionContent,
        discussionId: discussion.discussionId,
        discussionTitle: discussion.discussionTitle,
        subjectId: discussion.subjectId,
        userId: discussion.userId,
        status: 2,
      };
      dispatch(
        changeStatusDiscussion({
          discussId: discussion.discussionId,
          data: data,
        })
      )
        .unwrap()
        .then(() => {
          message.success("Approved discussion success!");
          dispatch(getDiscussionBySubjectId(discussion.subjectId));
        })
        .catch((err) => {
          message.error("Cannot approve discussion...");
          console.log(`APPROVE discuss err ===>`, err);
        });
    } else {
      confirm({
        title: "Are you sure delete this comment?",
        icon: <ExclamationCircleOutlined />,
        okText: "Yes, delete it",
        okType: "danger",
        cancelText: "No",
        onOk() {
          const data = {
            discussDate: discussion.discussDate,
            discussionContent: discussion.discussionContent,
            discussionId: discussion.discussionId,
            discussionTitle: discussion.discussionTitle,
            subjectId: discussion.subjectId,
            userId: discussion.userId,
            status: 3,
          };
          dispatch(
            changeStatusDiscussion({
              discussId: discussion.discussionId,
              data: data,
            })
          )
            .unwrap()
            .then(() => {
              message.success("Rejected discussion success!");
              dispatch(getDiscussionBySubjectId(discussion.subjectId));
            })
            .catch((err) => {
              message.error("Cannot reject discussion...");
              console.log(`REJECT discuss err ===>`, err);
            });
        },
        okButtonProps: {
          loading: changeStatusLoading,
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  const menu = (
    <Menu onClick={handleMenuOnClick}>
      <Menu.Item key="1" icon={<CheckOutlined />} style={{ color: "green" }}>
        Approve
      </Menu.Item>
      <Menu.Item key="2" danger icon={<CloseOutlined />}>
        Reject
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className={`discuss-container ${
        discussion.status === 3 ? `disable` : ``
      }`}
      // disabled={discussion.status === 3 ? true : false}
    >
      <p className="discuss-title">
        <NavLink
          to={`/courses/topic/${discussion.discussionId}/detail`}
          className="topic-link"
        >
          {discussion.discussionTitle}
        </NavLink>
        {currentUser.roleId === userRole.LECTURER ||
        currentUser.roleId === userRole.ADMIN ? (
          <Dropdown.Button
            type="link"
            icon={<MoreOutlined />}
            overlay={menu}
            trigger={["click"]}
          ></Dropdown.Button>
        ) : null}
      </p>
      <Row align="middle" gutter={[16, 0]}>
        <Col>
          {ownerDiscuss && (
            <>
              {ownerDiscuss.image ? (
                <Avatar src={ownerDiscuss.image} />
              ) : (
                <Avatar icon={<UserOutlined />} />
              )}
            </>
          )}
        </Col>
        <Col>
          <strong>{ownerDiscuss ? ownerDiscuss.name : "Unknown"}</strong>
        </Col>
        <Col>
          <i style={{ marginLeft: 50 }}>{`Posted on ${moment(
            discussion.discussDate
          ).format("MMM D YYYY")}`}</i>
        </Col>
        <Col>
          <span style={{ marginLeft: 50 }}>
            <CommentOutlined /> {discussComments ? discussComments.length : 0}
          </span>
        </Col>
        <Col>
          {currentUser.roleId === userRole.LECTURER ||
          currentUser.roleId === userRole.ADMIN ? (
            <span style={{ marginLeft: 50 }}>
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
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default Discussion;
