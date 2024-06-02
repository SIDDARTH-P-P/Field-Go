
import { createSlice, current } from '@reduxjs/toolkit';

const activityType = createSlice({
  name: 'activityType',
  initialState: {
    activityTypeData: [],
    loading: false,
    error: null,
    activityTypeCount: 0,
    activityTypeByIdData: {}
  },
  reducers: {
    addactivityType: (state) => {
      state.loading = true;
      state.error = null;
    },
    addactivityTypeSuccess: (state, action) => {
      state.loading = false;
      state.activityTypeByIdData = action.payload;
    },
    addactivityTypeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getactivityType: (state) => {
      state.loading = true;
      state.error = null;
    },
    getactivityTypeSuccess: (state, action) => {
      state.loading = false;
      state.activityTypeData = action.payload;
    },

    getactivityTypeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateactivityType: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateactivityTypeSuccess: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success) {
        state.stateData = state.stateData.map((Data) =>
          Data.id === action.payload.id ? action.payload : Data
        );
      } else {
        console.error('Update unsuccessful');
      }
    },
    updateactivityTypeFail: (state, action) => {
      alert('hey i am not here', action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    deleteactivityType: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteactivityTypeSuccess: (state, action) => {
      state.loading = false;
      state.stateData =
        action.payload === undefined
          ? current(state.stateData)
          : current(state.stateData).filter((option) => option.id !== action.payload);
    },
    deleteactivityTypeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getactivityTypeById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getactivityTypeByIdSuccess: (state, action) => {
      state.loading = false;
      state.activityTypeByIdData= action.payload;
    },
    getactivityTypeByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    totalCountSuccess: (state, action) => {
      state.loading = false;
      state.activityTypeCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {
  addactivityType,
  addactivityTypeSuccess,
  addactivityTypeFail,
  getactivityType,
  getactivityTypeSuccess,
  getactivityTypeFail,
  updateactivityType,
  updateactivityTypeSuccess,
  updateactivityTypeFail,
  deleteactivityType,
  deleteactivityTypeSuccess,
  deleteactivityTypeFail,
  getactivityTypeById,
  getactivityTypeByIdSuccess,
  getactivityTypeByIdFail,
  totalCount,
  totalCountSuccess,
  totalCountFail,
} = activityType.actions;

export default activityType.reducer;
