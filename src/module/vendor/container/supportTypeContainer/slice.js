import { createSlice } from '@reduxjs/toolkit';

const supportTypeSlice = createSlice({
  name: 'supportType',
  initialState: {
    supportTypeData: [],
    loading: false,
    error: null
  },
  reducers: {
    getSupportType: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSupportTypeSuccess: (state, action) => {
      state.loading = false;
      state.supportTypeData = action.payload;
    },
    getSupportTypeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const { getSupportType, getSupportTypeSuccess, getSupportTypeFail } = supportTypeSlice.actions;

export default supportTypeSlice.reducer;
