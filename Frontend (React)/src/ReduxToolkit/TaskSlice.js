
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api, setAuthHeader } from "../Api/api";

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async ({ status, sortByCreatedAt, sortByDeadline }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const response = await api.get("/api/tasks", {
        params: { status, sortByDeadline, sortByCreatedAt },
      });
      console.log("fetch tasks ", response.data);
      return response.data;
    } catch (error) {
      throw Error(error.response.data.error);
    }
  }
);

export const fetchUsersTasks = createAsyncThunk(
  "task/fetchUsersTasks",
  async ({ status, sortByCreatedAt, sortByDeadline,jwt }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const response = await api.get("/api/tasks/user",
      {params: { status, sortByDeadline, sortByCreatedAt }});
      console.log("fetch users tasks ", response.data);
      return response.data;
    } catch (error) {
      throw Error(error.response.data.error);
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  "task/fetchTaskById",
  async (taskId) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const response = await api.get(`/api/tasks/${taskId}`);
      console.log("fetch tasks By Id", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw Error(error.response.data.error);
    }
  }
);

export const createNewTask = createAsyncThunk(
  "task/createNewTask",
  async (taskData) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const response = await api.post("/api/tasks", taskData);
      console.log("created task", response.data);
      return response.data;
    } catch (error) {
      throw Error(error.response.data.error);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, updatedTaskData }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const response = await api.put(`/api/tasks/${id}`, updatedTaskData);
      console.log("updated task ", response.data);
      return response.data;
    } catch (error) {
      console.log("errror", error);
      throw Error(error.response.data.error);
    }
  }
);
export const assignedTaskToUser = createAsyncThunk(
  "task/assignedTaskToUser",
  async ({ userId, taskId }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const response = await api.put(
        `/api/tasks/${taskId}/user/${userId}/assigned`
      );
      console.log("assigned task ", response.data);
      return response.data;
    } catch (error) {
      console.log("errror", error);
      throw Error(error.response.data.error);
    }
  }
);


export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    await api.delete(`/api/tasks/${id}`);
    console.log("deleted");
    return id;
  } catch (error) {
    console.log("error ", error);
    throw Error(error.response.data.error);
  }
});

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    taskDetails: null,
    usersTask: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUsersTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.taskDetails = action.payload;
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        state.tasks = state.tasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        );
      })
      .addCase(assignedTaskToUser.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        state.tasks = state.tasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
