
import { createSlice, current } from '@reduxjs/toolkit';

const activityCategory = createSlice({
  name: 'activityCategory',
  initialState: {
    activityCategoryData: [],
    loading: false,
    error: null,
    activityCategoryCount: 0,
    activityCategoryByIdData: {}
  },
  reducers: {
    addactivityCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    addactivityCategorySuccess: (state, action) => {
      state.loading = false;
      state.activityCategoryByIdData = action.payload;
    },
    addactivityCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getactivityCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    getactivityCategorySuccess: (state, action) => {
      state.loading = false;
      state.activityCategoryData = action.payload;
    },

    getactivityCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateactivityCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateactivityCategorySuccess: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success) {
        state.stateData = state.stateData.map((Data) =>
          Data.id === action.payload.id ? action.payload : Data
        );
      } else {
        console.error('Update unsuccessful');
      }
    },
    updateactivityCategoryFail: (state, action) => {
      alert('hey i am not here', action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    deleteactivityCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteactivityCategorySuccess: (state, action) => {
      state.loading = false;
      state.stateData =
        action.payload === undefined
          ? current(state.stateData)
          : current(state.stateData).filter((option) => option.id !== action.payload);
    },
    deleteactivityCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getactivityCategoryById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getactivityCategoryByIdSuccess: (state, action) => {
      state.loading = false;
      state.activityCategoryByIdData= action.payload;
    },
    getactivityCategoryByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    totalCountSuccess: (state, action) => {
      state.loading = false;
      state.activityCategoryCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {
  addactivityCategory,
  addactivityCategorySuccess,
  addactivityCategoryFail,
  getactivityCategory,
  getactivityCategorySuccess,
  getactivityCategoryFail,
  updateactivityCategory,
  updateactivityCategorySuccess,
  updateactivityCategoryFail,
  deleteactivityCategory,
  deleteactivityCategorySuccess,
  deleteactivityCategoryFail,
  getactivityCategoryById,
  getactivityCategoryByIdSuccess,
  getactivityCategoryByIdFail,
  totalCount,
  totalCountSuccess,
  totalCountFail,
} = activityCategory.actions;

export default activityCategory.reducer;
