import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";

const RequestApplyJob = (props) => {
  const { requestApply } = props;

  const { allUsers } = useSelector((state) => state.user);

  const applier = allUsers.find(
    (element) => element.userId === requestApply.userId
  );

  return (
    <div className="request-apply-container">
      <div>
        {applier && (
          <>
            {applier.image ? (
              <Avatar src={applier.image} />
            ) : (
              <Avatar icon={<UserOutlined />} />
            )}
          </>
        )}

        <span style={{ margin: "0 10px" }}>
          <strong>{applier ? applier.name : "Unknown"}</strong>
        </span>
        <span>has sent request apply for this job.</span>
      </div>
      <div className="information">
        <span>
          <PhoneOutlined /> {requestApply.phoneNumber}
        </span>
        <span>
          <MailOutlined />
          {requestApply.email}
        </span>
        <span>
          {requestApply.cvUrl && (
            <a href={requestApply.cvUrl} target="_blank" rel="noreferrer">
              View CV here
            </a>
          )}
        </span>
      </div>
    </div>
  );
};

export default RequestApplyJob;
