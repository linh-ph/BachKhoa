import React, { useEffect } from "react";
import {
  Row,
  Button,
  Spin,
  // Card
  Col,
  Input,
  // List,
} from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import "./style.scss";
import Post from "../../components/post";
import { useSelector, useDispatch } from "react-redux";
import { getActivePost, searchPost, getAllBlogType } from "../../slices/blog";
import { getAllUsers } from "../../slices/user";
import { NavLink } from "react-router-dom";
// import CloudInstance from "../../cloudinary";

// const { Meta } = Card;
// const { Search } = Input;

const BlogPage = () => {
  const dispatch = useDispatch();
  const { blog, getLoading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getActivePost());
    dispatch(getAllBlogType());
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleSearch = (e) => {
    if (e.target.value) {
      dispatch(searchPost(e.target.value));
    } else {
      dispatch(getActivePost());
    }
  };

  return (
    <div className="blog-page">
      <Row justify="center">
        <Col span={16}>
          <div className="forum-title">
            <h1>blog & guidelines</h1>
            <p>
              Explore the forum and find the answers you have been searching
              for.
            </p>
          </div>
        </Col>
      </Row>
      <Row justify="center" style={{ margin: "40px 0 30px 0" }}>
        <Col span={16}>
          {/* <Search
            // prefix={<SearchOutlined />}
            // enterButton="Search"
            onSearch={handleSearch}
            placeholder="Search Posts"
          /> */}
          <Input
            placeholder="Search post"
            className="search-job-input"
            suffix={<SearchOutlined />}
            onPressEnter={handleSearch}
          />
        </Col>
      </Row>
      <Row
        justify="space-between"
        style={{ margin: "40px 0 20px 0" }}
        align="middle"
      >
        <Col>
          <div style={{ fontWeight: 700, fontSize: 20 }}>All Posts</div>
        </Col>
        <Col>
          <Button type="primary" className="create-post-btn">
            <NavLink to="/new-blog">Create Post</NavLink>
          </Button>
        </Col>
      </Row>

      {/* <CloudInstance /> */}
      {/* {getLoading === false ? ( */}
      {!getLoading ? (
        <Row className="blog-list">
          {blog.map((item) => (
            <Post key={item.postId} post={item} loading={getLoading} />
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

      {/* ) : (
        <Card style={{ marginTop: 16 }} loading={getLoading}>
          <Meta title="Card title" description="This is the description" />
        </Card>
      )} */}
    </div>
  );
};

export default BlogPage;
