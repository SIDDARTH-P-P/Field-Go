
import { createSlice, current } from '@reduxjs/toolkit';

const taskCategory = createSlice({
  name: 'taskCategory',
  initialState: {
    taskCategoryData: [],
    loading: false,
    error: null,
    taskCategoryCount: 0,
    taskCategoryByIdData: {}
  },
  reducers: {
    addtaskCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    addtaskCategorySuccess: (state, action) => {
      state.loading = false;
      state.taskCategoryByIdData = action.payload;
    },
    addtaskCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    gettaskCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    gettaskCategorySuccess: (state, action) => {
      state.loading = false;
      state.taskCategoryData = action.payload;
    },

    gettaskCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatetaskCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    updatetaskCategorySuccess: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success) {
        state.stateData = state.stateData.map((Data) =>
          Data.id === action.payload.id ? action.payload : Data
        );
      } else {
        console.error('Update unsuccessful');
      }
    },
    updatetaskCategoryFail: (state, action) => {
      alert('hey i am not here', action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    deletetaskCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletetaskCategorySuccess: (state, action) => {
      state.loading = false;
      state.stateData =
        action.payload === undefined
          ? current(state.stateData)
          : current(state.stateData).filter((option) => option.id !== action.payload);
    },
    deletetaskCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    gettaskCategoryById: (state) => {
      state.loading = true;
      state.error = null;
    },
    gettaskCategoryByIdSuccess: (state, action) => {
      state.loading = false;
      state.taskCategoryByIdData= action.payload;
    },
    gettaskCategoryByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    totalCountSuccess: (state, action) => {
      state.loading = false;
      state.taskCategoryCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {
  addtaskCategory,
  addtaskCategorySuccess,
  addtaskCategoryFail,
  gettaskCategory,
  gettaskCategorySuccess,
  gettaskCategoryFail,
  updatetaskCategory,
  updatetaskCategorySuccess,
  updatetaskCategoryFail,
  deletetaskCategory,
  deletetaskCategorySuccess,
  deletetaskCategoryFail,
  gettaskCategoryById,
  gettaskCategoryByIdSuccess,
  gettaskCategoryByIdFail,
  totalCount,
  totalCountSuccess,
  totalCountFail,
} = taskCategory.actions;

export default taskCategory.reducer;
