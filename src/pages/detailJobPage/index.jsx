import React, { useEffect, useCallback } from "react";
import { useParams, NavLink } from "react-router-dom";
import parse from "html-react-parser";
import {
  Row,
  Col,
  Typography,
  Spin,
  Avatar,
  // Tag,
  Button,
  Divider,
  List,
  // Image,
} from "antd";
import {
  LoadingOutlined,
  UserOutlined,
  SendOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
// import { FORMAT_DATE } from "../../utils/constant"
import moment from "moment";
import {
  getDetailJob,
  getAllCompany,
  getRequestApplyJob,
} from "../../slices/job";
import { getAllUsers } from "../../slices/user";
import "./style.scss";
import RequestApplyJob from "../../components/requestApplyJob";
import { userRole } from "../../utils/constant";

const { Paragraph } = Typography;
const currentUser = JSON.parse(sessionStorage.getItem("user"));

const DetailJobPage = () => {
  const { jobId } = useParams();

  const dispatch = useDispatch();

  const {
    detailJob,
    getDetailLoading,
    companies,
    requestApply,
    getRequestApplyLoading,
  } = useSelector((state) => state.job);

  const getData = useCallback(() => {
    dispatch(getAllUsers());
    dispatch(getDetailJob(jobId));
    dispatch(getRequestApplyJob(jobId));
    dispatch(getAllCompany());
  }, [dispatch, jobId]);

  useEffect(() => {
    getData();
  }, [getData]);

  const company = companies.find(
    (element) => element.companyId === detailJob.companyId
  );

  return !getDetailLoading ? (
    <>
      <Row justify="center">
        <Col span={14}>
          <div className="job-title">
            {detailJob.recruitmentImage ? (
              <Avatar
                size={100}
                // icon={<UserOutlined />}
                src={detailJob.recruitmentImage}
                style={{ border: "1px solid rgb(197, 197, 197)" }}
              />
            ) : (
              <Avatar size={100} icon={<UserOutlined />} />
            )}

            <div className="title">
              <h1>{detailJob.recruitmentName}</h1>
              <p className="company-name">{company && company.companyName}</p>
              <i>{`Posted on ${moment(detailJob.dateCreated).format(
                "MMM D YYYY"
              )}`}</i>
            </div>
            <div className="title-btn">
              <NavLink to={`/job/${jobId}/apply`}>
                <Button
                  className="apply-btn"
                  type="primary"
                  icon={<SendOutlined />}
                  disabled={currentUser.roleId === userRole.COMPANY && true}
                >
                  Apply Now
                </Button>
              </NavLink>
            </div>
          </div>
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 0]}>
        <Col
          span={14}
          // style={{
          //   minWidth: 500,
          // }}
        >
          {/* <Skeleton active loading={getDetailLoading}> */}
          <div className="detail-job">
            <div style={{ padding: "10px 0" }}>
              <Row justify="center" style={{ marginTop: "20px" }}>
                <Col span={22}>
                  <Row align="middle">
                    <Col>
                      <div className="job-info">
                        <p>
                          <InfoCircleOutlined /> Job Information:
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row justify="center">
                <Col span={22}>
                  {/* <div>{parse(detailBlog.postContent)}</div> */}
                  <Paragraph>
                    {parse(
                      typeof detailJob.recruitmentContent === "string"
                        ? detailJob.recruitmentContent
                        : ""
                      // options
                    )}
                  </Paragraph>
                </Col>
              </Row>
              {currentUser.roleId === userRole.COMPANY ||
              currentUser.roleId === userRole.ADMIN ? (
                <>
                  <Divider></Divider>
                  <Row justify="center">
                    <Col span={22}>
                      <div className="request-apply-area">
                        <p style={{ fontWeight: 700 }}>Apply Request</p>
                        {!getRequestApplyLoading ? (
                          <List
                            grid={{ gutter: [48, 0], column: 1 }}
                            dataSource={requestApply}
                            renderItem={(item) => (
                              <List.Item>
                                <RequestApplyJob
                                  key={item.id}
                                  requestApply={item}
                                />
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
                    </Col>
                  </Row>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* </Skeleton> */}
        </Col>
        {/* <Col span={5}>
        <div className="job-apply">
          <p>Apply</p>
          <button>Apply</button>
        </div>
      </Col> */}
      </Row>
    </>
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

export default DetailJobPage;
