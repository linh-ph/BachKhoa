import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./style.scss";
import { Layout, Row, Col } from "antd";
import TopBar from "./components/topBar";
import Footer from "./components/footer";
import LoginPage from "./pages/loginPage";
import ConfirmSignOut from "./pages/confirmSignOut";
import HomePage from "./pages/homePage";
import CoursePage from "./pages/coursePage";
import BlogPage from "./pages/blogPage";
import JobPage from "./pages/jobsPage";
import NewBlogPage from "./pages/newBlogPage";
import DetailBlogPage from "./pages/detailBlogPage";
import DetailSubjectPage from "./pages/detailSubjectPage";
import DetailJobPage from "./pages/detailJobPage";
import CreateJobPage from "./pages/createJob";
import ApplyJobPage from "./pages/applyJobPage";
import NewDiscussionPage from "./pages/newDiscussionPage";
import DetailDiscussionPage from "./pages/detailDiscussionPage";
import EditPostPage from "./pages/editPostPage";
import ProfilePage from "./pages/profilePage";
import EditDiscussPage from "./pages/editDiscussPage";

const { Content } = Layout;

function App() {
  //get logged user infor from sessionStorage
  const token = JSON.parse(sessionStorage.getItem("user"));

  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
          {/* <Route
                  exact
                  path="/forgot-password"
                  component={ResetPasswordPage}
                /> */}

          {/* <Route exact patch="/forgot-password" component={ForgotPassword} /> */}
        </Routes>
      </BrowserRouter>
    );
  }

  // function PrivateRoute({ children }) {
  //   //get logged user infor from sessionStorage
  //   const token = JSON.parse(sessionStorage.getItem("user"));
  //   return token ? children : <Navigate to="/" />;
  // }

  return (
    <BrowserRouter>
      <Row>
        <Layout className="app-layout">
          <Col span={24}>
            <TopBar token={token} />
            <Content style={{ padding: "0 50px", marginTop: 20 }}>
              <Routes>
                <Route path="/confirm-signout" element={<ConfirmSignOut />} />
                <Route index path="/home" element={<HomePage />} />
                <Route exact path="/courses" element={<CoursePage />} />
                <Route
                  exact
                  path="/courses/:subjectId/detail"
                  element={<DetailSubjectPage />}
                />
                <Route exact path="/blog" element={<BlogPage />} />
                <Route
                  exact
                  path="/blog/:postId/detail"
                  element={<DetailBlogPage />}
                />
                <Route exact path="/new-blog" element={<NewBlogPage />} />
                <Route exact path="/edit-blog" element={<EditPostPage />} />
                <Route
                  exact
                  path="/courses/topic/:discussionId/detail"
                  element={<DetailDiscussionPage />}
                />

                <Route
                  exact
                  path="/edit-discussion"
                  element={<EditDiscussPage />}
                />
                <Route
                  exact
                  path="/new-topic"
                  element={<NewDiscussionPage />}
                />
                <Route exact path="/jobs" element={<JobPage />} />
                <Route exact path="/create-job" element={<CreateJobPage />} />
                <Route
                  exact
                  path="/job/:jobId/detail"
                  element={<DetailJobPage />}
                />
                <Route
                  exact
                  path="/job/:jobId/apply"
                  element={<ApplyJobPage />}
                />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/:name/profile" element={<ProfilePage />} />
              </Routes>
            </Content>
          </Col>
        </Layout>
      </Row>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
