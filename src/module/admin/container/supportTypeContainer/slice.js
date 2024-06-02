// import { createSlice } from '@reduxjs/toolkit';

// const supportTypeSlice = createSlice({
//   name: 'supportType',
//   initialState: {
//     supportTypeData: [],
//     loading: false,
//     error: null
//   },
//   reducers: {
//     getSupportType: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     getSupportTypeSuccess: (state, action) => {
//       state.loading = false;
//       state.supportTypeData = action.payload;
//     },
//     getSupportTypeFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     }
//   }
// });
// export const { getSupportType, getSupportTypeSuccess, getSupportTypeFail } = supportTypeSlice.actions;

// export default supportTypeSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const supportTypeSlice = createSlice({
  name: 'supportType',
  initialState: {
    supportTypeData: [],
    loading: false,
    error: null,
    supportTypeCount: 0,
    supportByIdData: {}
  },
  reducers: {
    addSupportType: (state) => {
      state.loading = true;
      state.error = null;
    },
    addSupportTypeSuccess: (state, action) => {
      state.loading = false;
      state.supportTypeData = action.payload;
    },
    addSupportTypeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
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
    },
    getSupportTypeById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSupportTypeByIdSuccess: (state, action) => {
      state.loading = false;
      state.supportTypeByIdData = action.payload;
    },
    getSupportTypeByIdFail: (state, action) => {
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
      state.supportTypeCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSupportType: (state) => {
      state.loading = true;
      state.error = null;
    },
   
    updateSupportTypeSuccess: (state, action) => {
      console.log('================action.payload====================', action.payload);
      // alert('hey i am here');
      state.loading = false;
      state.supportTypeData =
        action.payload === undefined
          ? current(state).supportTypeData
          : current(state).supportTypeData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
    },
    updateSupportTypeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSupportType: (state) => {
      state.loading = true;
      state.error = null;
    },
    // deleteSupportTypeSuccess: (state, action) => {
    //   state.loading = false;
    //   state.supportTypeData =
    //     action.payload === undefined
    //       ? current(state.supportTypeData)
    //       : current(state.supportTypeData).filter((option) => option.id !== action.payload);
    // },
    // deleteSupportTypeSuccess: (state, action) => {
    //   state.loading = false;
    //   state.supportTypeData = state.supportTypeData.filter((option) => option.id !== action.payload);
    // },
    deleteSupportTypeSuccess: (state, action) => {
      state.loading = false;
      state.supportTypeData =
        action.payload === undefined 
        ? current(state.supportTypeData) 
        : current(state.supportTypeData).filter((option) => option.id !== action.payload);
    },
    deleteSupportTypeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  getSupportType,
  getSupportTypeSuccess,
  getSupportTypeFail,
  addSupportType,
  addSupportTypeSuccess,
  addSupportTypeFail,
  getSupportTypeById,
  getSupportTypeByIdSuccess,
  getSupportTypeByIdFail,
  totalCount,
  totalCountSuccess,
  totalCountFail,
  updateSupportType,
  updateSupportTypeSuccess,
  updateSupportTypeFail,
  deleteSupportType,
  deleteSupportTypeSuccess,
  deleteSupportTypeFail
} = supportTypeSlice.actions;

export default supportTypeSlice.reducer;
