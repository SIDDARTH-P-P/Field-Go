
import { createSlice, current } from '@reduxjs/toolkit';

const taskTypeSlice = createSlice({
  name: 'taskType',
  initialState: {
    taskTypeData: [],
    loading: false,
    error: null,
    taskTypeCount: 0,
    taskTypeByIdData: {}
  },
  reducers: {
    addtaskType: (state) => {
      state.loading = true;
      state.error = null;
    },
    addtaskTypeSuccess: (state, action) => {
      state.loading = false;
      state.taskTypeData = action.payload;
    },
    addtaskTypeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    gettaskType: (state) => {
      state.loading = true;
      state.error = null;
    },
    gettaskTypeSuccess: (state, action) => {
      state.loading = false;
      state.taskTypeData = action.payload;
    },

    gettaskTypeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatetaskType: (state) => {
      state.loading = true;
      state.error = null;
    },
    updatetaskTypeSuccess: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success) {
        state.stateData = state.stateData.map((Data) =>
          Data.id === action.payload.id ? action.payload : Data
        );
      } else {
        console.error('Update unsuccessful');
      }
    },
    updatetaskTypeFail: (state, action) => {
      alert('hey i am not here', action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    deletetaskType: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletetaskTypeSuccess: (state, action) => {
      state.loading = false;
      state.stateData =
        action.payload === undefined
          ? current(state.stateData)
          : current(state.stateData).filter((option) => option.id !== action.payload);
    },
    deletetaskTypeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    gettaskTypeById: (state) => {
      state.loading = true;
      state.error = null;
    },
    gettaskTypeByIdSuccess: (state, action) => {
      state.loading = false;
      state.taskTypeByIdData = action.payload;
    },
    gettaskTypeByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    totalCountSuccess: (state, action) => {
      state.loading = false;
      state.taskTypeCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {
  addtaskType,
  addtaskTypeSuccess,
  addtaskTypeFail,
  gettaskType,
  gettaskTypeSuccess,
  gettaskTypeFail,
  updatetaskType,
  updatetaskTypeSuccess,
  updatetaskTypeFail,
  deletetaskType,
  deletetaskTypeSuccess,
  deletetaskTypeFail,
  gettaskTypeById,
  gettaskTypeByIdSuccess,
  gettaskTypeIdFail,
  totalCount,
  totalCountSuccess,
  totalCountFail,
} = taskTypeSlice.actions;

export default taskTypeSlice.reducer;
