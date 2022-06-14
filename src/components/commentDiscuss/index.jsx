import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getUserById } from "../../slices/user";
import {
  Avatar,
  Dropdown,
  Menu,
  Form,
  Input,
  Button,
  message,
  Modal,
} from "antd";
import {
  UserOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
// import "./style.scss";
import { editCommentDiscuss, deleteCommentDiscuss } from "../../slices/user";
import { getCommentDiscussion } from "../../slices/discussion";

const currentUser = JSON.parse(sessionStorage.getItem("user"));
const { confirm } = Modal;

const CommentDiscuss = (props) => {
  const { comment } = props;

  const dispatch = useDispatch();

  const [visibleForm, setVisibleForm] = useState("none");
  const [visibleContent, setVisibleContent] = useState("block");

  //   const dispatch = useDispatch();
  const { allUsers, editLoading, deleteLoading } = useSelector(
    (state) => state.user
  );

  const ownerComment = allUsers.find(
    (element) => element.userId === comment.userId
  );

  const handleMenuClick = (item) => {
    if (item.key === "1") {
      setVisibleContent("none");
      setVisibleForm("block");
    } else {
      confirm({
        title: "Are you sure delete this comment?",
        icon: <ExclamationCircleOutlined />,
        okText: "Yes, delete it",
        okType: "danger",
        cancelText: "No",
        onOk() {
          dispatch(deleteCommentDiscuss(comment.id))
            .unwrap()
            .then(() => {
              message.success("Delete comment success!");
              dispatch(getCommentDiscussion(comment.discussionId));
            })
            .catch((err) => {
              message.error("Cannot delete comment...");
              console.log(`DELETE comment err ===>`, err);
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
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" icon={<DeleteOutlined />} danger>
        Delete
      </Menu.Item>
    </Menu>
  );

  const handleCancel = () => {
    setVisibleContent("block");
    setVisibleForm("none");
  };

  const onFinish = (values) => {
    const data = {
      content: values.comment,
      discussionId: comment.discussionId,
      userId: comment.userId,
    };
    dispatch(editCommentDiscuss({ commentId: comment.id, data: data }))
      .unwrap()
      .then(() => {
        message.success("Edit comment success!");
        dispatch(getCommentDiscussion(comment.discussionId));
      })
      .catch((err) => {
        message.error("Cannot edit comment...");
        console.log(`EDIT comment err ===>`, err);
      });
  };

  return (
    <div className="comment-section">
      {ownerComment && (
        <>
          {ownerComment.image ? (
            <Avatar
              size={40}
              src={ownerComment.image}
              style={{ marginTop: 10 }}
            />
          ) : (
            <Avatar
              size={40}
              icon={<UserOutlined />}
              style={{ marginTop: 10 }}
            />
          )}
        </>
      )}

      <div className="comment-content" style={{ display: visibleContent }}>
        <p className="comment-owner">
          <span>{ownerComment ? ownerComment.name : "Unknown"}</span>
          <span>
            {currentUser.userId === comment.userId && (
              <Dropdown.Button
                type="link"
                icon={<MoreOutlined />}
                overlay={menu}
                trigger={["click"]}
              ></Dropdown.Button>
            )}
          </span>
        </p>
        <p>{comment.content}</p>
      </div>
      <Form
        name="basic"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ display: visibleForm }}
      >
        <Form.Item
          // label="Username"
          name="comment"
          initialValue={comment.content}
        >
          <Input.TextArea className="comment-content" rows={4} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="edit-btn"
            loading={editLoading}
          >
            Save Changes
          </Button>
          <Button onClick={handleCancel} className="cancel-btn">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CommentDiscuss;
