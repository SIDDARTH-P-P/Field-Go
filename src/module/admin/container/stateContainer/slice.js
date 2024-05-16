
import { createSlice, current } from '@reduxjs/toolkit';

const stateSlice = createSlice({
  name: 'state',
  initialState: {
    stateData: [],
    loading: false,
    error: null,
    stateCount: 0,
    stateByIdData: {}
  },
  reducers: {
    addState: (state) => {
      state.loading = true;
      state.error = null;
    },
    addStateSuccess: (state, action) => {
      state.loading = false;
      state.stateData = action.payload;
    },
    addStateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getState: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStateSuccess: (state, action) => {
      state.loading = false;
      state.stateData = action.payload;
    },

    getStateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getStateById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStateByIdSuccess: (state, action) => {
      state.loading = false;
      state.stateByIdData = action.payload;
    },
    getStateByIdFail: (state, action) => {
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
      state.stateCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateState: (state) => {
      state.loading = true;
      state.error = null;
    },

    // updateStateSuccess: (state, action) => {
    //   console.log('================action.payload====================', action.payload);
    //   alert('hey i am here');
    //   state.loading = false;
    //   state.stateData =
    //     action.payload === undefined
    //       ? current(state).stateData
    //       : current(state).stateData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
    //   console.log('================stateData====================', state.stateData);

    //   //  state.stateData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
    // },
    updateStateSuccess: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success) {
        state.stateData = state.stateData.map((Data) =>
          Data.id === action.payload.id ? action.payload : Data
        );
      } else {
        console.error('Update unsuccessful');
      }
    },



  updateStateFail: (state, action) => {
      alert('hey i am not here', action.payload);

      state.loading = false;
      state.error = action.payload;
    },
  
    deleteState: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteStateSuccess: (state, action) => {
      state.loading = false;
      state.stateData =
        action.payload === undefined
          ? current(state.stateData)
          : current(state.stateData).filter((option) => option.id !== action.payload);
      //  state.stateData.filter((Data) => Data.id !== action.payload);
    },
    deleteStateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getState,
  getStateSuccess,
  getStateFail,
  addState,
  addStateSuccess,
  addStateFail,
  getStateById,
  getStateByIdSuccess,
  getStateByIdFail,
  totalCount,
  totalCountSuccess,
  totalCountFail,
  updateState,
  updateStateSuccess,
  updateStateFail,
  deleteState,
  deleteStateSuccess,
  deleteStateFail
} = stateSlice.actions;

export default stateSlice.reducer;
