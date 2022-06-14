import React, { useCallback, useEffect } from "react";
import {
  Row,
  Button,
  Spin,
  // Card
  Col,
  Input,
  // List,
} from "antd";
import "./style.scss";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getAllJob, getAllCompany, searchJobs } from "../../slices/job";
import { userRole } from "../../utils/constant";
import { NavLink } from "react-router-dom";
import Job from "../../components/job";

// const { Search } = Input;

const currentUser = JSON.parse(sessionStorage.getItem("user"));

const JobsPage = () => {
  const dispatch = useDispatch();
  const { jobs, getLoading } = useSelector((state) => state.job);

  const getData = useCallback(() => {
    dispatch(getAllJob());
    dispatch(getAllCompany());
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSearch = (e) => {
    if (e.target.value) {
      dispatch(searchJobs(e.target.value));
    } else {
      getData();
    }
  };

  return (
    <div className="courses-page">
      <Row justify="center">
        <Col span={16}>
          <div className="courses-title">
            <h1>jobs & recruitment</h1>
            <p>Browse jobs and start your work</p>
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={10}>
          {/* <Search
            // prefix={<SearchOutlined />}
            // enterButton="Search"
            // onSearch={handleSearch}
            placeholder="Search Posts"
          /> */}
          <Input
            placeholder="Search Jobs"
            className="search-job-input"
            suffix={<SearchOutlined />}
            onPressEnter={handleSearch}
          />
        </Col>
      </Row>
      <Row justify="center" style={{ margin: "20px 0" }}>
        <Col span={16}>
          <Row justify="space-between">
            <Col>
              <div style={{ fontWeight: 700, fontSize: 20 }}>All Jobs</div>
            </Col>
            {currentUser.roleId === userRole.COMPANY ? (
              <Col>
                <Button className="post-job-btn" type="primary">
                  <NavLink to="/create-job">Post Job</NavLink>
                </Button>
              </Col>
            ) : null}
          </Row>
        </Col>
      </Row>
      {!getLoading ? (
        <Row gutter={[40, 40]} justify="center" className="job-row">
          {jobs.map((job) => (
            <Job key={job.recruitmentId} job={job} />
          ))}
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
  );
};

export default JobsPage;
