import React from "react";
import {
  Card,
  Col,
  Typography,
  Row,
  // Avatar,
  // Tag
} from "antd";
// import {
//   UserOutlined,
//   HeartOutlined,
//   CommentOutlined,
// } from "@ant-design/icons";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const { Meta } = Card;
const { Title } = Typography;

const CompanyJob = (props) => {
  const { job } = props;

  const { companies } = useSelector((state) => state.job);

  const company = companies.find(
    (element) => element.companyId === job.companyId
  );

  return (
    <Col span={15} style={{ margin: "20px 0" }}>
      {/* <Skeleton loading={loading} active> */}

      <Card
        className="blog-card"
        // title={blog.postName}
        // loading={loading}
        bordered={false}
        style={{ width: "100%" }}
        bodyStyle={{
          minHeight: "150px",
        }}
      >
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
                    marginLeft: 10,
                    // overflow: "auto",
                    whiteSpace: "normal",
                  }}
                >
                  <NavLink
                    to={`/job/${job.recruitmentId}/detail`}
                    // state={{ userId: post.userId }}
                    className="post-link"
                  >
                    {job.recruitmentName}
                  </NavLink>
                </Title>
              }
            />
            <Row>
              <Col
                span={10}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {/* <Avatar icon={<UserOutlined />} /> */}
                  <span style={{ marginLeft: 10, fontWeight: 600 }}>
                    {company ? company.companyName : "Unknown"}
                  </span>
                </div>
                <span>
                  <i>{`Posted on ${moment(job.dateCreated).format(
                    "MMM D YYYY"
                  )}`}</i>
                </span>
              </Col>
            </Row>
          </Col>
          <Col>
            <img
              height={100}
              src={job.recruitmentImage}
              alt={job.recruitmentImage}
            />
          </Col>
        </Row>
      </Card>

      {/* </Skeleton> */}
    </Col>
  );
};

export default CompanyJob;
