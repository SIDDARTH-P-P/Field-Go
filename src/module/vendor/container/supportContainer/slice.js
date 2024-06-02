import { createSlice,current } from '@reduxjs/toolkit';

const supportSlice = createSlice({
  name: 'support',
  initialState: {
    supportData: [],
    loading: false,
    error: null,
    supportCount:0,
    supportByIdData: {}
  },
  reducers: {
    addSupport: (state) => {
      state.loading = true;
      state.error = null;
    },
    addSupportSuccess: (state, action) => {
      state.loading = false;
      state.supportData = action.payload;
    },
    addSupportFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSupport: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSupportSuccess: (state, action) => {
      state.loading = false;
      state.supportData = action.payload;
    },

    getSupportFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSupportById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSupportByIdSuccess: (state, action) => {
      state.loading = false;
      state.supportByIdData = action.payload;
    },
    getSupportByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    totalCountSuccess: (state, action) => {
    
      console.log('===============action.payload=====================',action.payload);

      state.loading = false;
      state.supportCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSupport: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateSupportSuccess: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success) {
        // Assuming your API returns the updated support object upon success
        state.supportData = state.supportData.map((data) =>
          data.id === action.payload.id ? action.payload : data
        );
      } else {
        console.error('Update unsuccessful');
      }
    },
    
    updateSupportFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSupport: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSupportSuccess: (state, action) => {
      state.loading = false;
      state.supportData =
        action.payload === undefined
          ? current(state.supportData)
          : current(state.supportData).filter((option) => option.id !== action.payload);
    },
    deleteSupportFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getSupport,
  getSupportSuccess,
  getSupportFail,

  addSupport,
  addSupportSuccess,
  addSupportFail,

  getSupportById,
  getSupportByIdSuccess,
  getSupportByIdFail,

  totalCount,
  totalCountSuccess,
  totalCountFail,
  updateSupport,
  updateSupportSuccess,
  updateSupportFail,
  
  deleteSupport,
  deleteSupportSuccess,
  deleteSupportFail
} = supportSlice.actions;

export default supportSlice.reducer;