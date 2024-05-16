import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customerData: [],
    loading: false,
    error: null,
    customerCount: 0,
    customerByIdData: {}
  },
  reducers: {
    addCustomer: (state) => {
      state.loading = true;
      state.error = null;
    },
    addCustomerSuccess: (state, action) => {
      state.loading = false;
      state.customerData = action.payload;
    },
    addCustomerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCustomer: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCustomerSuccess: (state, action) => {
      state.loading = false;
      state.customerData = action.payload;
    },
    getCustomerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCustomerById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCustomerByIdSuccess: (state, action) => {
      state.loading = false;
      state.customerByIdData = action.payload;
    },
    getCustomerByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCustomer: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCustomerSuccess: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success) {
        state.customerData = state.customerData.map((Data) =>
          Data.id === action.payload.id ? action.payload : Data
        );
      } else {
        console.error('Update unsuccessful');
      }
    },
    updateCustomerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    custCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    custCountSuccess: (state, action) => {
      state.loading = false;
      state.customerCount = action.payload.count;
    },
    custCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCustomer: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCustomerSuccess: (state, action) => {
      state.loading = false;
      state.customerData = state.customerData.filter(
        (option) => option.id !== action.payload
      );
    },
    deleteCustomerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCustomer,
  getCustomerSuccess,
  getCustomerFail,
  addCustomer,
  addCustomerSuccess,
  addCustomerFail,
  getCustomerById,
  getCustomerByIdSuccess,
  getCustomerByIdFail,
  updateCustomer,
  updateCustomerSuccess,
  updateCustomerFail,
  custCount,
  custCountSuccess,
  custCountFail,
  deleteCustomer,
  deleteCustomerSuccess,
  deleteCustomerFail,
} = customerSlice.actions;

export default customerSlice.reducer;
