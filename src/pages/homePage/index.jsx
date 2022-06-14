import React, { useCallback, useEffect } from "react";
import { Row, Col, Tabs, List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { getPostByUserId } from "../../slices/blog";
import { getAllSubjectByUserId } from "../../slices/subject";
import { getStatisticById } from "../../slices/user";
import { getDiscussByUserId } from "../../slices/discussion";
import { getJobByCompanyId } from "../../slices/job";
import UserPost from "../../components/userPost";
import UserDiscussion from "../../components/userDiscussion";
import EnrolledCourse from "../../components/enrolledCourse";
// import CompanyJob from "../../components/companyJob";
import { userRole } from "../../utils/constant";

//get logged user information from sessionStorage
const currentUser = JSON.parse(sessionStorage.getItem("user"));
const { TabPane } = Tabs;

const HomePage = () => {
  const dispatch = useDispatch();

  const { getLoading, postByUserId } = useSelector((state) => state.blog);
  const { total, getTotalLoading } = useSelector((state) => state.user);
  // const { jobByCompany, getByCompanyLoading } = useSelector(
  //   (state) => state.job
  // );
  const { getByIdLoading, discussByUser } = useSelector(
    (state) => state.discussion
  );
  const { enrolledSubject, getEnrolledSubjectLoading } = useSelector(
    (state) => state.subjects
  );

  const getData = useCallback(() => {
    dispatch(getStatisticById(currentUser.userId));
    dispatch(getPostByUserId(currentUser.userId));
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleTabClick = (values) => {
    switch (values) {
      case "1":
        dispatch(getPostByUserId(currentUser.userId));
        break;
      case "2":
        dispatch(getAllSubjectByUserId(currentUser.userId));
        break;
      case "3":
        dispatch(getDiscussByUserId(currentUser.userId));
        break;
      case "4":
        dispatch(getJobByCompanyId(currentUser.userId));
        break;
      default:
        break;
    }
  };

  return !getTotalLoading ? (
    <div className="home-container">
      <Row gutter={[48, 0]}>
        <Col span={6}>
          <div className="total-overview">
            <h1>{total.totalPostCreated}</h1>
            <p>Total posts created</p>
          </div>
        </Col>
        <Col span={6}>
          <div className="total-overview">
            <h1>{total.totalPostLiked}</h1>
            <p>Total post likes</p>
          </div>
        </Col>
        <Col span={6}>
          <div className="total-overview">
            <h1>{total.totalCourseEnrolled}</h1>
            <p>Total courses enrolled</p>
          </div>
        </Col>
        <Col span={6}>
          <div className="total-overview">
            <h1>{total.totalJobApply}</h1>
            <p>Total jobs applied</p>
          </div>
        </Col>
      </Row>
      <div className="statistics-container">
        <Row>
          <Col span={24}>
            <Tabs
              defaultActiveKey="1"
              tabPosition="left"
              onTabClick={handleTabClick}
            >
              <TabPane tab="Posts" key="1">
                <div className="total-post">
                  <p>
                    <strong>All posts created</strong>
                  </p>
                  {!getLoading ? (
                    <Row justify="center">
                      <Col span={20}>
                        <List
                          itemLayout="horizontal"
                          dataSource={postByUserId}
                          renderItem={(item) => (
                            <List.Item>
                              <UserPost key={item.postId} userPost={item} />
                            </List.Item>
                          )}
                        />
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
                  )}
                </div>
              </TabPane>
              {currentUser.roleId !== userRole.COMPANY && (
                <TabPane tab="Courses Enrolled" key="2">
                  <div className="total-post">
                    <p>
                      <strong>All courses enrolled</strong>
                    </p>
                    {!getEnrolledSubjectLoading ? (
                      <List
                        // itemLayout="horizontal"
                        grid={{ gutter: [48, 32], column: 4 }}
                        dataSource={enrolledSubject.listSubject}
                        renderItem={(item) => (
                          <List.Item>
                            <EnrolledCourse
                              key={item.subjectId}
                              subject={item}
                            />
                            {/* <p>{item.subjectId}</p> */}
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
                </TabPane>
              )}
              {currentUser.roleId !== userRole.COMPANY && (
                <TabPane tab="Discussions" key="3">
                  <div className="total-post">
                    <p>
                      <strong>All discussions created</strong>
                    </p>
                    {!getByIdLoading ? (
                      <Row justify="center">
                        <Col span={20}>
                          <List
                            itemLayout="horizontal"
                            // grid={{ gutter: [48, 32], column: 4 }}
                            dataSource={discussByUser}
                            renderItem={(item) => (
                              <List.Item>
                                <UserDiscussion
                                  key={item.discussionId}
                                  discussion={item}
                                />
                                {/* <p>{item.subjectId}</p> */}
                              </List.Item>
                            )}
                          />
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
                    )}
                  </div>
                </TabPane>
              )}
              {/* {currentUser.roleId === userRole.COMPANY && (
                <TabPane tab="Jobs created" key="4">
                  <div className="total-post">
                    <p>
                      <strong>All jobs created</strong>
                    </p>
                    {!getByCompanyLoading ? (
                      <List
                        itemLayout="horizontal"
                        // grid={{ gutter: [48, 32], column: 4 }}
                        dataSource={jobByCompany}
                        renderItem={(item) => (
                          <List.Item>
                            <CompanyJob key={item.recruitmentId} job={item} />
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
                </TabPane>
              )} */}
            </Tabs>
          </Col>
        </Row>
      </div>
    </div>
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

export default HomePage;
