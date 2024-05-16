
import { createSlice } from '@reduxjs/toolkit';

const mainCategorySlice = createSlice({
  name: 'mainCategory',
  initialState: {
    mainCategoryData: [],
    loading: false,
    error: null,
    mainCategoryCount: 0,
    mainCategoryByIdData: {}
  },
  reducers: {
    addMainCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    addMainCategorySuccess: (state, action) => {
      console.log("=========addmain=========", action.payload);
      state.loading = false;
      state.mainCategoryData = action.payload;
    },
    addMainCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getMainCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMainCategorySuccess: (state, action) => {
      console.log("=========main=========", action.payload);
      state.loading = false;
      state.mainCategoryData = action.payload;
    },

    getMainCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getMainCategoryById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMainCategoryByIdSuccess: (state, action) => {
      state.loading = false;
      state.mainCategoryByIdData = action.payload;
    },
    getMainCategoryByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    totalCountSuccess: (state, action) => {
      console.log('===============action.payload=====================', action.payload);

      state.loading = false;
      state.mainCategoryCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateMainCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
   
    updateMainCategorySuccess: (state, action) => {
      console.log('================action.payload====================', action.payload);
      // alert('hey i am here');
      state.loading = false;
      state.mainCategoryData =
        action.payload === undefined
          ? current(state).mainCategoryData
          : current(state).mainCategoryData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
    },
    updateMainCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMainCategory: (state) => {
      state.loading = true;
      state.error = null;
    },

    deleteMainCategorySuccess: (state, action) => {
      state.loading = false;
      state.mainCategoryData =
        action.payload === undefined 
        ? current(state.mainCategoryData) 
        : current(state.mainCategoryData).filter((option) => option.id !== action.payload);
    },
    deleteMainCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  getMainCategory,
  getMainCategorySuccess,
  getMainCategoryFail,
  addMainCategory,
  addMainCategorySuccess,
  addMainCategoryFail,
  getMainCategoryById,
  getMainCategoryByIdSuccess,
  getMainCategoryByIdFail,
  totalCount,
  totalCountSuccess,
  totalCountFail,
  updateMainCategory,
  updateMainCategorySuccess,
  updateMainCategoryFail,
  deleteMainCategory,
  deleteMainCategorySuccess,
  deleteMainCategoryFail
} = mainCategorySlice.actions;

export default mainCategorySlice.reducer;
