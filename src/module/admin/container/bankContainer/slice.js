import { createSlice } from '@reduxjs/toolkit';

const bankSlice = createSlice({
  name: 'bank',
  initialState: {
    bankData: [],
    loading: false,
    error: null,
    bankByIdData: {}
  },
  reducers: {
    addBank: (state) => {
      state.loading = true;
      state.error = null;
    },
    addBankSuccess: (state, action) => {
      state.loading = false;
      state.bankData = action.payload;
    },
    addBankFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    getBank: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBankSuccess: (state, action) => {
      state.loading = false;
      state.bankData = action.payload;
    },

    getBankFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    getBankById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBankByIdSuccess: (state, action) => {
      state.loading = false;
      state.bankByIdData = action.payload;
    },
    getBankByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    updateBank: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateBankSuccess: (state, action) => {
      console.log('================action.payload====================', action.payload);
      // alert('hey i am here');
      state.loading = false;
      state.bankData =
        action.payload === undefined
          ? current(state).bankData
          : current(state).bankData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
    },
    updateBankFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },



    deleteBank: (state) => {
      state.loading = true;
      state.error = null;
    },
 

    deleteBankSuccess: (state, action) => {
      state.loading = false;
      state.bankData =
        action.payload === undefined 
        ? current(state.bankData) 
        : current(state.bankData).filter((option) => option.id !== action.payload);
    },

    deleteBankFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getBank,
  getBankSuccess,
  getBankFail,

  addBank,
  addBankSuccess,
  addBankFail,

  getBankById,
  getBankByIdSuccess,
  getBankByIdFail,

  updateBank,
  updateBankSuccess,
  updateBankFail,

  deleteBank,
  deleteBankSuccess,
  deleteBankFail
} = bankSlice.actions;

export default bankSlice.reducer;
