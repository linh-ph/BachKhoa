import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiLinks } from "../utils";
import {
  CLOUD_NAME,
  UPLOAD_PRESET,
  CLOUD_API,
  CV_FOLDER,
} from "../utils/cloudinary-instance";

export const getAllJob = createAsyncThunk(
  "job/getAllJob",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiLinks.job.getAll);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllCompany = createAsyncThunk(
  "job/getAllCompany",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiLinks.company.getAll);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchJobs = createAsyncThunk(
  "job/searchJobs",
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiLinks.job.search}/{name}?name=${name}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailJob = createAsyncThunk(
  "job/getDetailJob",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiLinks.job.getDetail}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewJob = createAsyncThunk(
  "job/addNewJob",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiLinks.job.add, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadCV = createAsyncThunk(
  "job/uploadCV",
  async (file, { rejectWithValue }) => {
    try {
      const data = new FormData();

      data.append("file", file);
      data.append("folder", CV_FOLDER);
      data.append("public_id", file.name);
      data.append("upload_preset", UPLOAD_PRESET);
      data.append("cloud_name", CLOUD_NAME);

      const response = await axios.post(CLOUD_API, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const applyJob = createAsyncThunk(
  "job/applyJob",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiLinks.job.applyJob, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRequestApplyJob = createAsyncThunk(
  "job/getRequestApplyJob",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiLinks.job.getRequestApply}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getJobByCompanyId = createAsyncThunk(
  "job/getJobByCompanyId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiLinks.job.getByCompanyId}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editJob = createAsyncThunk(
  "job/editJob",
  async (args, { rejectWithValue }) => {
    try {
      const { id, data } = args;
      const response = await axios.put(`${apiLinks.job.edit}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiLinks.job.delete}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    detailJob: [],
    companies: [],
    jobByCompany: [],
    requestApply: [],
    result: null,
    applyResult: null,
    uploadResult: null,
    newJobContent: null,
    getLoading: false,
    addLoading: false,
    uploadLoading: false,
    applyLoading: false,
    getRequestApplyLoading: false,
    getAllCompanyLoading: false,
    getDetailLoading: false,
    getByCompanyLoading: false,
    editLoading: false,
    deleteLoading: false,
    error: null,
  },
  reducers: {
    setNewJobContent: (state, action) => {
      state.newJobContent = action.payload;
    },
    resetUploadResult: (state) => {
      state.uploadResult = null;
    },
  },
  extraReducers: {
    // get all job
    [getAllJob.pending]: (state) => {
      state.getLoading = true;
    },
    [getAllJob.fulfilled]: (state, action) => {
      state.getLoading = false;
      state.jobs = action.payload;
    },
    [getAllJob.rejected]: (state, action) => {
      state.getLoading = false;
      state.error = action.payload;
    },
    //get all companies
    [getAllCompany.pending]: (state) => {
      state.getAllCompanyLoading = true;
    },
    [getAllCompany.fulfilled]: (state, action) => {
      state.getAllCompanyLoading = false;
      state.companies = action.payload;
    },
    [getAllCompany.rejected]: (state, action) => {
      state.getAllCompanyLoading = false;
      state.error = action.payload;
    },
    // search Jobs
    [searchJobs.pending]: (state) => {
      state.getLoading = true;
    },
    [searchJobs.fulfilled]: (state, action) => {
      state.getLoading = false;
      state.jobs = action.payload;
    },
    [searchJobs.rejected]: (state, action) => {
      state.getLoading = false;
      state.error = action.payload;
    },
    // get detailJob
    [getDetailJob.pending]: (state) => {
      state.getDetailLoading = true;
    },
    [getDetailJob.fulfilled]: (state, action) => {
      state.getDetailLoading = false;
      state.detailJob = action.payload;
    },
    [getDetailJob.rejected]: (state, action) => {
      state.getDetailLoading = false;
      state.error = action.payload;
    },
    // add new job
    [addNewJob.pending]: (state) => {
      state.addLoading = true;
    },
    [addNewJob.fulfilled]: (state, action) => {
      state.addLoading = false;
      state.result = action.payload;
    },
    [addNewJob.rejected]: (state, action) => {
      state.addLoading = false;
      state.error = action.payload;
    },
    // upload CV to cloud
    [uploadCV.pending]: (state) => {
      state.uploadLoading = true;
    },
    [uploadCV.fulfilled]: (state, action) => {
      state.uploadLoading = false;
      state.uploadResult = action.payload;
    },
    [uploadCV.rejected]: (state, action) => {
      state.uploadLoading = false;
      state.error = action.payload;
    },
    // send apply job request
    [applyJob.pending]: (state) => {
      state.applyLoading = true;
    },
    [applyJob.fulfilled]: (state, action) => {
      state.applyLoading = false;
      state.applyResult = action.payload;
    },
    [applyJob.rejected]: (state, action) => {
      state.applyLoading = false;
      state.error = action.payload;
    },
    // get request apply job
    [getRequestApplyJob.pending]: (state) => {
      state.getRequestApplyLoading = true;
    },
    [getRequestApplyJob.fulfilled]: (state, action) => {
      state.getRequestApplyLoading = false;
      state.requestApply = action.payload;
    },
    [getRequestApplyJob.rejected]: (state, action) => {
      state.getRequestApplyLoading = false;
      state.error = action.payload;
    },
    // get jobs by company
    [getJobByCompanyId.pending]: (state) => {
      state.getByCompanyLoading = true;
    },
    [getJobByCompanyId.fulfilled]: (state, action) => {
      state.getByCompanyLoading = false;
      state.jobByCompany = action.payload;
    },
    [getJobByCompanyId.rejected]: (state, action) => {
      state.getByCompanyLoading = false;
      state.error = action.payload;
    },
    // edit job
    [editJob.pending]: (state) => {
      state.editLoading = true;
    },
    [editJob.fulfilled]: (state, action) => {
      state.editLoading = false;
      state.result = action.payload;
    },
    [editJob.rejected]: (state, action) => {
      state.editLoading = false;
      state.error = action.payload;
    },
    // delete job
    [deleteJob.pending]: (state) => {
      state.deleteLoading = true;
    },
    [deleteJob.fulfilled]: (state, action) => {
      state.deleteLoading = false;
      state.result = action.payload;
    },
    [deleteJob.rejected]: (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setNewJobContent, resetUploadResult } = jobSlice.actions;

export default jobSlice.reducer;
