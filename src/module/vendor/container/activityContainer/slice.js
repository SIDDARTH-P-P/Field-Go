import { createSlice } from '@reduxjs/toolkit';

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    activityData: [],
    loading: false,
    error: null,
    activityCount: 0,
    activityByIdData: {}
  },
  reducers: {
    addactivity: (state) => {
      state.loading = true;
      state.error = null;
    },
    addactivitySuccess: (state, action) => {
      state.loading = false;
      state.activityData = action.payload;
    },
    addactivityFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getactivity: (state) => {
      state.loading = true;
      state.error = null;
    },
    getactivitySuccess: (state, action) => {
      state.loading = false;
      state.activityData = action.payload;
    },
    getactivityFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getactivityById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getactivityByIdSuccess: (state, action) => {
      state.loading = false;
      state.activityByIdData = action.payload;
    },
    getactivityByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateactivity: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateactivitySuccess: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success) {
        state.activityData = state.activityData.map((Data) =>
          Data.id === action.payload.id ? action.payload : Data
        );
      } else {
        console.error('Update unsuccessful');
      }
    },
    updateactivityFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    activityCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    activityCountSuccess: (state, action) => {
      state.loading = false;
      state.activityCount = action.payload.count;
    },
    activityCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteactivity: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteactivitySuccess: (state, action) => {
      state.loading = false;
      state.activityData = state.activityData.filter(
        (option) => option.id !== action.payload
      );
    },
    deleteactivityFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getactivity,
  getactivitySuccess,
  getactivityFail,
  addactivity,
  addactivitySuccess,
  addactivityFail,
  getactivityById,
  getactivityByIdSuccess,
  getactivityByIdFail,
  updateactivity,
  updateactivitySuccess,
  updateactivityFail,
  activityCount,
  activityCountSuccess,
  activityCountFail,
  deleteactivity,
  deleteactivitySuccess,
  deleteactivityFail,
} = activitySlice.actions;

export default activitySlice.reducer;
