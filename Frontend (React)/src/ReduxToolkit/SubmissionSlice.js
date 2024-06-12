import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api, setAuthHeader } from '../Api/api';


export const submitTask = createAsyncThunk(
  'submissions/submitTask',
  async ({ taskId, githubLink}) => {
    setAuthHeader(localStorage.getItem("jwt"),api)
    try {
      const response = await api.post(
        `/api/submissions?task_id=${taskId}&github_link=${githubLink}`,
        {},
        
      );
      console.log("submited task",response.data);
      return response.data;
    } catch (error) {
        console.log("catch error ",error)
      throw error;
    }
  }
);


export const fetchAllSubmissions = createAsyncThunk(
  'submissions/fetchAllSubmissions',
  async () => {
    try {
      const response = await api.get("/api/submissions");
      console.log("fetch all submission ", response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchSubmissionsByTaskId = createAsyncThunk(
    'submissions/fetchSubmissionsByTaskId',
    async ({taskId}) => {
      try {
        const response = await api.get(`/api/submissions/task/${taskId}`);
        console.log("fetch all submission ", response.data)
        return response.data;
      } catch (error) {
        console.log("error",error)
        throw error;
      }
    }
  );

  export const acceptDeclineSubmission = createAsyncThunk(
    'submissions/acceptDeclineSubmission',
    async ({id,status}) => {
      try {
        const response = await api.put(`/api/submissions/${id}?status=${status}`);
        console.log("accept or decline ", response.data)
        return response.data;
      } catch (error) {
        console.log("error ",error)
        throw error;
      }
    }
  );


const submissionSlice = createSlice({
  name: 'submission',
  initialState: {
    submissions: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.submissions.push(action.payload);
      })
      .addCase(submitTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllSubmissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.submissions = action.payload;
      })
      .addCase(fetchAllSubmissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSubmissionsByTaskId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.submissions = action.payload;
      })
      .addCase(acceptDeclineSubmission.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.submissions = state.submissions.map((item)=>item.id!==action.payload.id?item:action.payload);
      })
  },
});

export default submissionSlice.reducer;

// Export actions
// export { submitTask, fetchAllSubmissions };
