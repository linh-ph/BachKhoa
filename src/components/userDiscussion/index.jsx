import React, { useEffect } from "react";
import { Row, Col, Dropdown, Menu, Tag, message, Modal } from "antd";
import moment from "moment";
import {
  EditOutlined,
  CommentOutlined,
  MoreOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getCommentDiscussion,
  getDiscussByUserId,
  deleteDiscussion,
} from "../../slices/discussion";
import {
  NavLink,
  //  useLocation
} from "react-router-dom";
import "./style.scss";
import { userRole, postStatus } from "../../utils/constant";

const currentUser = JSON.parse(sessionStorage.getItem("user"));
const { confirm } = Modal;

const UserDiscussion = (props) => {
  const { discussion } = props;

  const dispatch = useDispatch();

  const { discussComments, deleteLoading } = useSelector(
    (state) => state.discussion
  );

  useEffect(() => {
    dispatch(getCommentDiscussion(discussion.discussionId));
  }, [dispatch, discussion.discussionId]);

  const status = postStatus.find((element) => element.id === discussion.status);

  const handleMenuOnClick = (item) => {
    if (item.key === "2") {
      confirm({
        title: "Are you sure delete this discussion?",
        icon: <ExclamationCircleOutlined />,
        okText: "Yes, delete it",
        okType: "danger",
        cancelText: "No",
        onOk() {
          dispatch(deleteDiscussion(discussion.discussionId))
            .unwrap()
            .then(() => {
              message.success("Delete discussion success!", 1.5).then(() => {
                dispatch(getDiscussByUserId(currentUser.userId));
              });
            })
            .catch((err) => {
              message.error("Cannot delete discussion...");
              console.log(`DELETE discuss err ===>`, err);
            });
        },
        okButtonProps: {
          loading: deleteLoading,
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  const menu = (
    <Menu onClick={handleMenuOnClick}>
      <Menu.Item key="1" icon={<EditOutlined />}>
        <NavLink
          to={`/edit-discussion`}
          state={{ discussId: discussion.discussionId }}
        >
          Edit
        </NavLink>
      </Menu.Item>
      <Menu.Item key="2" danger icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className="discuss-container"
      style={{ width: "100%" }}
      // disabled={discussion.status === 3 ? true : false}
    >
      <p className="discuss-title">
        <NavLink
          to={`/courses/topic/${discussion.discussionId}/detail`}
          className="topic-link"
        >
          {discussion.discussionTitle}
        </NavLink>
        {currentUser.userId === discussion.userId && (
          <Dropdown.Button
            // disabled={discussion.status === 3 ? true : false}
            type="link"
            icon={<MoreOutlined />}
            overlay={menu}
            trigger={["click"]}
          ></Dropdown.Button>
        )}
      </p>
      <Row align="middle" gutter={[16, 0]}>
        <Col>
          <i>{`Posted on ${moment(discussion.discussDate).format(
            "MMM D YYYY"
          )}`}</i>
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

export default UserDiscussion;
