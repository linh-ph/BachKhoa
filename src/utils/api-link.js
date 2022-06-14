export const API = "https://website-se.herokuapp.com";

const apiLinks = {
  auth: {
    token: `${API}/api/users/login`,
  },
  user: {
    getById: `${API}/api/users/getByID`,
    getAll: `${API}/api/users/getAllUser`,
    commentPost: `${API}/api/users/commentPost`,
    commentDiscussion: `${API}/api/users/commentDiscussion`,
    edit: `${API}/api/users/edit`,
    delete: `${API}/api/users/deleteUser`,
    changePassword: `${API}/api/users/changepassword`,
    editCommentPost: `${API}/api/users/edit/commentPost`,
    deleteCommentPost: `${API}/api/users/deleteComment`,
    editCommentDiscuss: `${API}/api/users/edit/commentDiscussion`,
    deleteCommentDiscuss: `${API}/api/users/deleteComment`,
  },
  blog: {
    getAll: `${API}/api/post/getall`,
    add: `${API}/api/post/add`,
    getDetail: `${API}/api/post/get`,
    getAllBlogType: `${API}/api/post/getAllType`,
    getActivePost: `${API}/api/post/getActivePost`,
    likePost: `${API}/api/post/like`,
    search: `${API}/api/post/getPostByName`,
    getComment: `${API}/api/post`,
    getByUser: `${API}/api/post/getPostByUserId`,
    update: `${API}/api/post/edit`,
    delete: `${API}/api/post/delete`,
    checkLikeStatus: `${API}/api/post/checkLikeStatusPost`,
  },
  course: {
    getAll: `${API}/api/subject/getall`,
    getDetail: `${API}/api/subject/getById`,
    search: `${API}/api/subject/getByName`,
    enrollCourse: `${API}/api/subject/enroll`,
    getAllByUserId: `${API}/api/subject/getAllSubjectByUserId`,
  },
  discussion: {
    get: `${API}/api/discussion/getDiscussBySubjectID`,
    add: `${API}/api/discussion/add`,
    getDetail: `${API}/api/discussion/getDiscussByID`,
    getComment: `${API}/api/discussion`,
    search: `${API}/api/discussion/searchDiscussInSubjectByTitle`,
    changeStatus: `${API}/api/discussion/approve`,
    getByUserId: `${API}/api/discussion/getDiscussByuserID`,
    edit: `${API}/api/discussion/edit`,
    delete: `${API}/api/discussion/delete`,
  },
  job: {
    add: `${API}/api/recruitment/add`,
    getAll: `${API}/api/recruitment/getall`,
    search: `${API}/api/recruitment/getByName`,
    getDetail: `${API}/api/recruitment/getById`,
    applyJob: `${API}/api/users/applyjob`,
    getRequestApply: `${API}/api/recruitment/getApplyJobByRecruitmentId`,
    getByCompanyId: `${API}/api/recruitment/getByCompanyId`,
    edit: `${API}/api/recruitment/edit`,
    delete: `${API}/api/recruitment/delete`,
  },
  company: {
    getAll: `${API}/api/conpany/getall`,
  },
  statistic: {
    get: `${API}/api/statistic`,
  },
};

export default apiLinks;
