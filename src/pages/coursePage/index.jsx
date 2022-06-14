import React, { useEffect } from "react";
import { Row, Spin, Col, Input } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import Course from "../../components/course";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../slices/user";
import { getAllSubject, searchSubject } from "../../slices/subject";

// const { Search } = Input;

const CoursePage = () => {
  const dispatch = useDispatch();
  const { subjects, getLoading } = useSelector((state) => state.subjects);

  useEffect(() => {
    dispatch(getAllSubject());
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleSearch = (e) => {
    if (e.target.value) {
      dispatch(searchSubject(e.target.value));
    } else {
      dispatch(getAllSubject());
    }
  };

  return (
    <div className="courses-page">
      <Row justify="center">
        <Col span={16}>
          <div className="courses-title">
            <h1>courses & discussions</h1>
            <p>Courses to get you started</p>
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={10}>
          {/* <Search
            // prefix={<SearchOutlined />}
            // enterButton="Search"
            onSearch={handleSearch}
            placeholder="Search Posts"
          /> */}
          <Input
            placeholder="Search subject"
            className="search-job-input"
            suffix={<SearchOutlined />}
            onPressEnter={handleSearch}
          />
        </Col>
      </Row>
      <Row justify="space-between" style={{ margin: "20px 200px" }}>
        <Col>
          <div style={{ fontWeight: 700, fontSize: 20 }}>All Courses</div>
        </Col>
      </Row>
      {!getLoading ? (
        <Row gutter={[40, 40]} className="courses-list">
          {subjects.map((subject) => (
            <Course
              key={subject.subjectId}
              subject={subject}
              loading={getLoading}
            />
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

export default CoursePage;
