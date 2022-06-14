import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { apiLinks } from "../utils";

export const getAllSubject = createAsyncThunk(
  "subjects/getAllSubject",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiLinks.course.getAll);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailSubject = createAsyncThunk(
  "subjects/getDetailSubject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiLinks.course.getDetail}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchSubject = createAsyncThunk(
  "subjects/searchSubject",
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiLinks.course.search}/${name}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const enrollSubject = createAsyncThunk(
  "subjects/enrollSubject",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiLinks.course.enrollCourse, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllSubjectByUserId = createAsyncThunk(
  "subjects/getAllSubjectByUserId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiLinks.course.getAllByUserId}/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const subjectSlice = createSlice({
  name: "subjects",
  initialState: {
    subjects: [],
    detailSubject: [],
    enrolledSubject: [],
    students: [],
    enrollResult: null,
    enrollModal: false,
    getLoading: true,
    getEnrolledSubjectLoading: false,
    getDetailLoading: true,
    enrollLoading: false,
    error: null,
  },
  reducers: {
    setEnrollModal: (state, action) => {
      state.enrollModal = action.payload;
    },
  },
  extraReducers: {
    //get all subjects
    [getAllSubject.pending]: (state) => {
      state.getLoading = true;
    },
    [getAllSubject.fulfilled]: (state, action) => {
      state.getLoading = false;
      state.subjects = action.payload;
    },
    [getAllSubject.rejected]: (state, action) => {
      state.getLoading = false;
      state.error = action.error;
    },
    //get detail subject
    [getDetailSubject.pending]: (state) => {
      state.getDetailLoading = true;
    },
    [getDetailSubject.fulfilled]: (state, action) => {
      state.getDetailLoading = false;
      state.detailSubject = action.payload;
    },
    [getDetailSubject.rejected]: (state) => {
      state.getDetailLoading = false;
    },
    //search subject
    [searchSubject.pending]: (state) => {
      state.getLoading = true;
    },
    [searchSubject.fulfilled]: (state, action) => {
      state.getLoading = false;
      state.subjects = action.payload;
    },
    [searchSubject.rejected]: (state, action) => {
      state.getLoading = false;
      state.error = action.payload;
    },
    // enroll subject
    [enrollSubject.pending]: (state) => {
      state.enrollLoading = true;
    },
    [enrollSubject.fulfilled]: (state, action) => {
      state.enrollLoading = false;
      state.enrollResult = action.payload;
    },
    [enrollSubject.rejected]: (state, action) => {
      state.enrollLoading = false;
      state.error = action.payload;
    },
    //get enrolled subject by userId
    [getAllSubjectByUserId.pending]: (state) => {
      state.getEnrolledSubjectLoading = true;
    },
    [getAllSubjectByUserId.fulfilled]: (state, action) => {
      state.getEnrolledSubjectLoading = false;
      state.enrolledSubject = action.payload;
    },
    [getAllSubjectByUserId.rejected]: (state, action) => {
      state.getEnrolledSubjectLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setEnrollModal } = subjectSlice.actions;

export default subjectSlice.reducer;
