import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loginSlice from "../slices/login";
import blogSlice from "../slices/blog";
import subjectSlice from "../slices/subject";
import userSlice from "../slices/user";
import jobSlice from "../slices/job";
import discussionSlice from "../slices/discussion";

const middleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
});

const store = configureStore({
  reducer: {
    login: loginSlice,
    blog: blogSlice,
    subjects: subjectSlice,
    user: userSlice,
    job: jobSlice,
    discussion: discussionSlice,
  },
  middleware,
});

export default store;
