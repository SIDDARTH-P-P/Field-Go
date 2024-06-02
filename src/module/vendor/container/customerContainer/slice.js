import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'task',
  initialState: {
    customerData: [],
    loading: false,
    error: null,
    customerCount: 0,
    customerByIdData: {}
  },
  reducers: {
    addtask: (state) => {
      state.loading = true;
      state.error = null;
    },
    addtaskSuccess: (state, action) => {
      state.loading = false;
      state.customerData = action.payload;
    },
    addtaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    gettask: (state) => {
      state.loading = true;
      state.error = null;
    },
    gettaskSuccess: (state, action) => {
      state.loading = false;
      state.customerData = action.payload;
    },
    gettaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getTaskById: (state) => {
      state.loading = true;
      state.error = null;
    },
    gettaskByIdSuccess: (state, action) => {
      state.loading = false;
      state.customerByIdData = action.payload;
    },
    gettaskByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTask: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTaskSuccess: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success) {
        state.customerData = state.customerData.map((Data) =>
          Data.id === action.payload.id ? action.payload : Data
        );
      } else {
        console.error('Update unsuccessful');
      }
    },
    updateTaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    custCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    custCountSuccess: (state, action) => {
      state.loading = false;
      state.customerCount = action.payload.count;
    },
    custCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletetask: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletetaskSuccess: (state, action) => {
      state.loading = false;
      state.customerData = state.customerData.filter(
        (option) => option.id !== action.payload
      );
    },
    deletetaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  gettask,
  gettaskSuccess,
  gettaskFail,
  addtask,
  addtaskSuccess,
  addtaskFail,
  getTaskById,
  gettaskByIdSuccess,
  gettaskByIdFail,
  updateTask,
  updateTaskSuccess,
  updateTaskFail,
  custCount,
  custCountSuccess,
  custCountFail,
  deletetask,
  deletetaskSuccess,
  deletetaskFail,
} = customerSlice.actions;

export default customerSlice.reducer;
