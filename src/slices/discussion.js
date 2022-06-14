import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { apiLinks } from "../utils";

export const getDiscussionBySubjectId = createAsyncThunk(
  "discussion/getDiscussionBySubjectId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiLinks.discussion.get}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewDiscussion = createAsyncThunk(
  "discussion/addNewDiscussion",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiLinks.discussion.add, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailDiscussion = createAsyncThunk(
  "discussion/getDetailDiscussion",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiLinks.discussion.getDetail}/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCommentDiscussion = createAsyncThunk(
  "discussion/getCommentDiscussion",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiLinks.discussion.getComment}/${id}/comments`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchDiscussion = createAsyncThunk(
  "discussion/searchDiscussion",
  async (args, { rejectWithValue }) => {
    try {
      const { id, title } = args;
      const response = await axios.get(
        `${apiLinks.discussion.search}/${id}?title=${title}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeStatusDiscussion = createAsyncThunk(
  "discussion/changeStatusDiscussion",
  async (args, { rejectWithValue }) => {
    try {
      const { discussId, data } = args;
      const response = await axios.put(
        `${apiLinks.discussion.changeStatus}/${discussId}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDiscussByUserId = createAsyncThunk(
  "discussion/getDiscussByUserId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiLinks.discussion.getByUserId}/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editDiscussion = createAsyncThunk(
  "discussion/editDiscussion",
  async (args, { rejectWithValue }) => {
    try {
      const { id, data } = args;
      const response = await axios.put(
        `${apiLinks.discussion.edit}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDiscussion = createAsyncThunk(
  "discussion/deleteDiscussion",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${apiLinks.discussion.delete}/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const discussionSlice = createSlice({
  name: "discussion",
  initialState: {
    discussion: [],
    detailDiscussion: [],
    discussComments: [],
    discussByUser: [],
    discussContent: null,
    result: null,
    addLoading: false,
    getCommentLoading: false,
    getDetailLoading: false,
    getLoading: false,
    changeStatusLoading: false,
    getByIdLoading: false,
    editLoading: false,
    deleteLoading: false,
    error: null,
  },
  reducers: {
    setDiscussContent: (state, action) => {
      state.discussContent = action.payload;
    },
  },
  extraReducers: {
    //get discussion of subject
    [getDiscussionBySubjectId.pending]: (state) => {
      state.getLoading = true;
    },
    [getDiscussionBySubjectId.fulfilled]: (state, action) => {
      state.getLoading = false;
      state.discussion = action.payload;
    },
    [getDiscussionBySubjectId.rejected]: (state, action) => {
      state.getLoading = false;
      state.error = action.payload;
    },
    // add new discussion
    [addNewDiscussion.pending]: (state) => {
      state.addLoading = true;
    },
    [addNewDiscussion.fulfilled]: (state, action) => {
      state.addLoading = false;
      state.result = action.payload;
    },
    [addNewDiscussion.rejected]: (state, action) => {
      state.addLoading = false;
      state.error = action.payload;
    },
    // get detail discussion
    [getDetailDiscussion.pending]: (state) => {
      state.getDetailLoading = true;
    },
    [getDetailDiscussion.fulfilled]: (state, action) => {
      state.getDetailLoading = false;
      state.detailDiscussion = action.payload;
    },
    [getDetailDiscussion.rejected]: (state, action) => {
      state.getDetailLoading = false;
      state.error = action.payload;
    },
    // get comments of discussion
    [getCommentDiscussion.pending]: (state) => {
      state.getCommentLoading = true;
    },
    [getCommentDiscussion.fulfilled]: (state, action) => {
      state.getCommentLoading = false;
      state.discussComments = action.payload;
    },
    [getCommentDiscussion.rejected]: (state, action) => {
      state.getCommentLoading = false;
      state.error = action.payload;
    },
    // search discussions
    [searchDiscussion.pending]: (state) => {
      state.getLoading = true;
    },
    [searchDiscussion.fulfilled]: (state, action) => {
      state.getLoading = false;
      state.discussion = action.payload;
    },
    [searchDiscussion.rejected]: (state, action) => {
      state.getLoading = false;
      state.error = action.payload;
    },
    // change status discussion
    [changeStatusDiscussion.pending]: (state) => {
      state.changeStatusLoading = true;
    },
    [changeStatusDiscussion.fulfilled]: (state, action) => {
      state.changeStatusLoading = false;
      state.result = action.payload;
    },
    [changeStatusDiscussion.rejected]: (state, action) => {
      state.changeStatusLoading = false;
      state.error = action.payload;
    },
    // get discussion by userId
    [getDiscussByUserId.pending]: (state) => {
      state.getByIdLoading = true;
    },
    [getDiscussByUserId.fulfilled]: (state, action) => {
      state.getByIdLoading = false;
      state.discussByUser = action.payload;
    },
    [getDiscussByUserId.rejected]: (state, action) => {
      state.getByIdLoading = false;
      state.error = action.payload;
    },
    // edit discussion
    [editDiscussion.pending]: (state) => {
      state.editLoading = true;
    },
    [editDiscussion.fulfilled]: (state, action) => {
      state.editLoading = false;
      state.result = action.payload;
    },
    [editDiscussion.rejected]: (state, action) => {
      state.editLoading = false;
      state.error = action.payload;
    },
    // delete discussion
    [deleteDiscussion.pending]: (state) => {
      state.deleteLoading = true;
    },
    [deleteDiscussion.fulfilled]: (state, action) => {
      state.deleteLoading = false;
      state.result = action.payload;
    },
    [deleteDiscussion.rejected]: (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setDiscussContent } = discussionSlice.actions;

export default discussionSlice.reducer;
