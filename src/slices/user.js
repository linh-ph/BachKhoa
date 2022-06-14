import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { apiLinks } from "../utils";
import {
  CLOUD_NAME,
  UPLOAD_PRESET,
  CLOUD_API,
} from "../utils/cloudinary-instance";

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiLinks.user.getById}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiLinks.user.getAll);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const commentPost = createAsyncThunk(
  "user/commentPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiLinks.user.commentPost, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const commentDiscussion = createAsyncThunk(
  "user/commentDiscussion",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiLinks.user.commentDiscussion, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStatisticById = createAsyncThunk(
  "user/getStatisticById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiLinks.statistic.get}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (img, { rejectWithValue }) => {
    try {
      const data = new FormData();

      data.append("file", img);
      data.append("upload_preset", UPLOAD_PRESET);
      data.append("cloud_name", CLOUD_NAME);

      const response = await axios.post(CLOUD_API, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async (args, { rejectWithValue }) => {
    try {
      const { id, data } = args;
      const response = await axios.put(`${apiLinks.user.edit}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiLinks.user.delete}/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (args, { rejectWithValue }) => {
    try {
      const { id, data } = args;
      const response = await axios.put(
        `${apiLinks.user.changePassword}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editCommentPost = createAsyncThunk(
  "user/editCommentPost",
  async (args, { rejectWithValue }) => {
    try {
      const { commentId, data } = args;
      const response = await axios.put(
        `${apiLinks.user.editCommentPost}/${commentId}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCommentPost = createAsyncThunk(
  "user/deleteCommentPost",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${apiLinks.user.deleteCommentPost}/${commentId}/post`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editCommentDiscuss = createAsyncThunk(
  "user/editCommentDiscuss",
  async (args, { rejectWithValue }) => {
    try {
      const { commentId, data } = args;
      const response = await axios.put(
        `${apiLinks.user.editCommentDiscuss}/${commentId}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCommentDiscuss = createAsyncThunk(
  "user/deleteCommentDiscuss",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${apiLinks.user.deleteCommentDiscuss}/${id}/discussion`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    allUsers: [],
    total: [],
    uploadResult: null,
    deleteResult: null,
    editUserResult: null,
    changePassResult: null,
    getLoading: false,
    getTotalLoading: false,
    commentLoading: false,
    result: null,
    error: null,
    uploadLoading: false,
    editLoading: false,
    deleteLoading: false,
    changePassLoading: false,
  },
  reducers: {
    resetUploadResult: (state) => {
      state.uploadResult = null;
    },
  },
  extraReducers: {
    // get userByID
    [getUserById.pending]: (state) => {
      state.getLoading = true;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.getLoading = false;
      state.user = action.payload;
    },
    [getUserById.rejected]: (state, action) => {
      state.getLoading = false;
      state.error = action.payload;
    },
    // get AllUsers
    [getAllUsers.pending]: (state) => {
      state.getLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.getLoading = false;
      state.allUsers = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.getLoading = false;
      state.error = action.payload;
    },
    // comment post
    [commentPost.pending]: (state) => {
      state.commentLoading = true;
    },
    [commentPost.fulfilled]: (state, action) => {
      state.commentLoading = false;
      state.result = action.payload;
    },
    [commentPost.rejected]: (state, action) => {
      state.commentLoading = false;
      state.error = action.payload;
    },
    // comment discussion
    [commentDiscussion.pending]: (state) => {
      state.commentLoading = true;
    },
    [commentDiscussion.fulfilled]: (state, action) => {
      state.commentLoading = false;
      state.result = action.payload;
    },
    [commentDiscussion.rejected]: (state, action) => {
      state.commentLoading = false;
      state.error = action.payload;
    },
    // get statistic by userId
    [getStatisticById.pending]: (state) => {
      state.getTotalLoading = true;
    },
    [getStatisticById.fulfilled]: (state, action) => {
      state.getTotalLoading = false;
      state.total = action.payload;
    },
    [getStatisticById.rejected]: (state, action) => {
      state.getTotalLoading = false;
      state.error = action.payload;
    },
    // upload avatar
    [uploadAvatar.pending]: (state) => {
      state.uploadLoading = true;
    },
    [uploadAvatar.fulfilled]: (state, action) => {
      state.uploadLoading = false;
      state.uploadResult = action.payload;
    },
    [uploadAvatar.rejected]: (state, action) => {
      state.uploadLoading = false;
      state.error = action.payload;
    },
    // edit user
    [editUser.pending]: (state) => {
      state.editLoading = true;
    },
    [editUser.fulfilled]: (state, action) => {
      state.editLoading = false;
      state.editUserResult = action.payload;
    },
    [editUser.rejected]: (state, action) => {
      state.editLoading = false;
      state.error = action.payload;
    },
    // delete user
    [deleteUser.pending]: (state) => {
      state.deleteLoading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.deleteLoading = false;
      state.deleteResult = action.payload;
    },
    [deleteUser.rejected]: (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },
    // change user password
    [changePassword.pending]: (state) => {
      state.changePassLoading = true;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.changePassLoading = false;
      state.changePassResult = action.payload;
    },
    [changePassword.rejected]: (state, action) => {
      state.changePassLoading = false;
      state.error = action.payload;
    },
    // edit comment post
    [editCommentPost.pending]: (state) => {
      state.editLoading = true;
    },
    [editCommentPost.fulfilled]: (state, action) => {
      state.editLoading = false;
      state.result = action.payload;
    },
    [editCommentPost.rejected]: (state, action) => {
      state.editLoading = false;
      state.error = action.payload;
    },
    // delete comment post
    [deleteCommentPost.pending]: (state) => {
      state.deleteLoading = true;
    },
    [deleteCommentPost.fulfilled]: (state, action) => {
      state.deleteLoading = false;
      state.result = action.payload;
    },
    [deleteCommentPost.rejected]: (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },
    // edit comment discuss
    [editCommentDiscuss.pending]: (state) => {
      state.editLoading = true;
    },
    [editCommentDiscuss.fulfilled]: (state, action) => {
      state.editLoading = false;
      state.result = action.payload;
    },
    [editCommentDiscuss.rejected]: (state, action) => {
      state.editLoading = false;
      state.error = action.payload;
    },
    // delete comment discuss
    [deleteCommentDiscuss.pending]: (state) => {
      state.deleteLoading = true;
    },
    [deleteCommentDiscuss.fulfilled]: (state, action) => {
      state.deleteLoading = false;
      state.result = action.payload;
    },
    [deleteCommentDiscuss.rejected]: (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },
  },
});

export const { resetUploadResult } = userSlice.actions;

export default userSlice.reducer;
