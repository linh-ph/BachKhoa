import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { apiLinks } from "../utils";
import {
  CLOUD_NAME,
  UPLOAD_PRESET,
  CLOUD_API,
} from "../utils/cloudinary-instance";

export const getAllBlog = createAsyncThunk(
  "blog/getAllBlog",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiLinks.blog.getAll);
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBlog = createAsyncThunk(
  "blog/addBlog",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiLinks.blog.add, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllBlogType = createAsyncThunk(
  "blog/getAllBlogType",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiLinks.blog.getAllBlogType);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailBlog = createAsyncThunk(
  "blog/getDetailBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiLinks.blog.getDetail}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "blog/uploadImage",
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

export const reactPost = createAsyncThunk(
  "blog/reactPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiLinks.blog.likePost, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchPost = createAsyncThunk(
  "blog/searchPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiLinks.blog.search}/${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostComments = createAsyncThunk(
  "blog/getPostComments",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiLinks.blog.getComment}/${id}/comments`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostByUserId = createAsyncThunk(
  "blog/getPostByUserUserId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiLinks.blog.getByUser}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editPost = createAsyncThunk(
  "blog/editPost",
  async (args, { rejectWithValue }) => {
    try {
      const { data, id } = args;
      const response = await axios.put(`${apiLinks.blog.update}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "blog/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiLinks.blog.delete}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getActivePost = createAsyncThunk(
  "blog/getActivePost",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiLinks.blog.getActivePost);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkLikeStatusPost = createAsyncThunk(
  "blog/checkLikeStatusPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiLinks.blog.checkLikeStatus, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blog: [],
    detailBlog: [],
    postByUserId: [],
    blogType: [],
    comments: [],
    reactResult: null,
    checkLikePost: null,
    imgUrl: null,
    newPostContent: null,
    uploadResult: null,
    error: null,
    result: null,
    getLoading: true,
    uploadLoading: false,
    addLoading: false,
    editLoading: false,
    getTypeLoading: false,
    getCommentLoading: false,
    getDetailLoading: false,
    deleteLoading: false,
    checkLoading: false,
  },
  reducers: {
    setImgUrl: (state, action) => {
      state.imgUrl = action.payload;
    },
    setPostContent: (state, action) => {
      state.newPostContent = action.payload;
    },
    resetUploadResult: (state) => {
      state.uploadResult = null;
    },
  },

  extraReducers: {
    // get all posts
    [getAllBlog.pending]: (state) => {
      state.getLoading = true;
    },
    [getAllBlog.fulfilled]: (state, action) => {
      state.getLoading = false;
      state.blog = action.payload;
    },
    [getAllBlog.rejected]: (state, action) => {
      state.getLoading = false;
      state.error = action.error;
    },
    // get active post
    [getActivePost.pending]: (state) => {
      state.getLoading = true;
    },
    [getActivePost.fulfilled]: (state, action) => {
      state.getLoading = false;
      state.blog = action.payload;
    },
    [getActivePost.rejected]: (state, action) => {
      state.getLoading = false;
      state.error = action.payload;
    },
    // add post
    [addBlog.pending]: (state) => {
      state.addLoading = true;
    },
    [addBlog.fulfilled]: (state, action) => {
      state.addLoading = false;
      state.result = action.payload;
    },
    [addBlog.rejected]: (state, action) => {
      state.addLoading = false;
      state.result = action.error;
    },
    //get detail post
    [getDetailBlog.pending]: (state) => {
      state.getDetailLoading = true;
    },
    [getDetailBlog.fulfilled]: (state, action) => {
      state.getDetailLoading = false;
      state.detailBlog = action.payload;
    },
    [getDetailBlog.rejected]: (state, action) => {
      state.getDetailLoading = false;
      state.error = action.error;
    },
    // get all post type
    [getAllBlogType.pending]: (state) => {
      state.getTypeLoading = true;
    },
    [getAllBlogType.fulfilled]: (state, action) => {
      state.getTypeLoading = false;
      state.blogType = action.payload;
    },
    [getAllBlogType.rejected]: (state, action) => {
      state.getTypeLoading = false;
      state.error = action.error;
    },
    // upload image to cloud
    [uploadImage.pending]: (state) => {
      state.uploadLoading = true;
    },
    [uploadImage.fulfilled]: (state, action) => {
      state.uploadLoading = false;
      state.uploadResult = action.payload;
    },
    [uploadImage.rejected]: (state, action) => {
      state.uploadLoading = false;
      state.error = action.payload;
    },
    // react post
    [reactPost.fulfilled]: (state, action) => {
      state.reactResult = action.payload;
    },
    [reactPost.rejected]: (state, action) => {
      state.error = action.payload;
    },
    // search posts
    [searchPost.pending]: (state) => {
      state.getLoading = true;
    },
    [searchPost.fulfilled]: (state, action) => {
      state.getLoading = false;
      state.blog = action.payload;
    },
    [searchPost.rejected]: (state, action) => {
      state.getLoading = false;
      state.error = action.payload;
    },
    // get post comments
    [getPostComments.pending]: (state) => {
      state.getCommentLoading = true;
    },
    [getPostComments.fulfilled]: (state, action) => {
      state.getCommentLoading = false;
      state.comments = action.payload;
    },
    [getPostComments.rejected]: (state, action) => {
      state.getCommentLoading = false;
      state.error = action.payload;
    },
    // get post by userId
    [getPostByUserId.pending]: (state) => {
      state.getLoading = true;
    },
    [getPostByUserId.fulfilled]: (state, action) => {
      state.getLoading = false;
      state.postByUserId = action.payload;
    },
    [getPostByUserId.rejected]: (state, action) => {
      state.getLoading = false;
      state.error = action.payload;
    },
    // edit post
    [editPost.pending]: (state) => {
      state.editLoading = true;
    },
    [editPost.fulfilled]: (state, action) => {
      state.editLoading = false;
      state.result = action.payload;
    },
    [editPost.rejected]: (state, action) => {
      state.editLoading = action.payload;
    },
    // delete post
    [deletePost.pending]: (state) => {
      state.deleteLoading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.deleteLoading = false;
      state.result = action.payload;
    },
    [deletePost.rejected]: (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },
    // get like status post
    [checkLikeStatusPost.pending]: (state) => {
      state.checkLoading = true;
    },
    [checkLikeStatusPost.fulfilled]: (state, action) => {
      state.checkLoading = false;
      state.checkLikePost = action.payload;
    },
    [checkLikeStatusPost.rejected]: (state, action) => {
      state.checkLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setImgUrl, setPostContent, resetUploadResult } =
  blogSlice.actions;

export default blogSlice.reducer;
