
import { createSlice, current } from '@reduxjs/toolkit';

const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countryData: [],
    loading: false,
    error: null,
    countryCount: 0,
    countryByIdData: {}
  },
  reducers: {
    addCountry: (state) => {
      state.loading = true;
      state.error = null;
    },
    addCountrySuccess: (state, action) => {
      state.loading = false;
      state.countryData = action.payload;
    },
    addCountryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getCountry: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCountrySuccess: (state, action) => {
      state.loading = false;
      state.countryData = action.payload;
    },

    getCountryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCountryById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCountryByIdSuccess: (state, action) => {
      state.loading = false;
      state.countryByIdData = action.payload;
    },
    getCountryByIdFail: (state, action) => {
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
      state.countryCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.count;
    },
    updateCountry: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    updateCountrySuccess: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success) {
        state.countryData = state.countryData.map((Data) =>
          Data.id === action.payload.id ? action.payload : Data
        );
      } else {
        console.error('Update unsuccessful');
      }
    },

    
    // updateCountrySuccess: (state, action) => {
    //   console.log('================action.payload====================', action.payload);
    //   alert('hey i am here');
    //   state.loading = false;
    //   state.countryData =
    //     action.payload === undefined
    //       ? current(state).countryData
    //       : current(state).countryData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
    //   console.log('================countryData====================', state.countryData);

    //   //  state.countryData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
    // },
  // updateCountrySuccess: (state, action) => {
  //   alert('hey i am  here', action.payload);
  //   state.loading = false;
  //   if (Array.isArray(state.countryData)) {
  //     state.countryData =
  //       action.payload === undefined
  //         ? current(state.countryData)
  //         : current(state.countryData).map((option) => {
  //             if(option.id === id) {
  //               option.id = option.id.filter((_,i) => i !== index)
  //             }   
  //             return option;
  //           });
  //   } 
  // },


  updateCountryFail: (state, action) => {
      alert('hey i am not here', action.payload);

      state.loading = false;
      state.error = action.payload;
    },

    // updateCountrySuccess: (state, action) => {
    //   console.log('================state.countryData====================',state.countryData);

    //   state.loading = false;
    //   state.countryData =
    //   current(state).countryData.map((Data) =>
    //   (Data.countryByIdData === action.payload.countryByIdData ? action.payload : Data))

    // //  state.countryData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
    // },

  
    deleteCountry: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCountrySuccess: (state, action) => {
      state.loading = false;
      state.countryData =
        action.payload === undefined
          ? current(state.countryData)
          : current(state.countryData).filter((option) => option.id !== action.payload);
      //  state.countryData.filter((Data) => Data.id !== action.payload);
    },
    deleteCountryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getCountry,
  getCountrySuccess,
  getCountryFail,
  addCountry,
  addCountrySuccess,
  addCountryFail,
  getCountryById,
  getCountryByIdSuccess,
  getCountryByIdFail,
  totalCount,
  totalCountSuccess,
  totalCountFail,
  updateCountry,
  updateCountrySuccess,
  updateCountryFail,
  deleteCountry,
  deleteCountrySuccess,
  deleteCountryFail
} = countrySlice.actions;

export default countrySlice.reducer;

