import { createSlice } from '@reduxjs/toolkit';


const districtSlice = createSlice({
    name: 'districts',
    initialState: {
      districtData: [],     

      loading: false,
      error: null,
      districtCount:0,
      districtByIdData: {}
   
    },
    reducers:{
      addDistrict: (state) => {
        state.loading = true;
        state.error = null;
      },
      addDistrictSuccess: (state, action) => {  
        state.loading = false;
        state.districtData = action.payload;
      },
      addDistrictFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
        getDistrict: (state) => {
            state.loading = true;
            state.error = null;
          },
          getDistrictSuccess: (state, action) => {
            state.loading = false;
            state.districtData = action.payload;
           
          },
      
          getDistrictFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            
          },
          getDistrictById: (state) => {
            state.loading = true;
            state.error = null;
          },
          getDistrictByIdSuccess: (state, action) => {
            state.loading = false;
            state.districtByIdData = action.payload;
          },
          getDistrictByIdFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          updateDistrict: (state) => {
            state.loading = true;
            state.error = null;
          },
          updateDistrictSuccess: (state, action) => {
            if (action.payload && action.payload.success) {
              state.loading = false;
              state.districtData = current(state).districtData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
              console.log('================districtData====================', state.districtData);
            } else {
              // Handle the case where the update was not successful
              console.error('Update unsuccessful');
            }
          },
          updateDistrictFail: (state, action) => {
            alert('hey i am not here', action.payload);
      
            state.loading = false;
            state.error = action.payload;
          },
          districtCount: (state) => {
            state.loading = true;
            state.error = null;
          },
          districtCountSuccess: (state, action) => {
            state.loading = false;
            state.districtCount = action.payload.count;
          },
          districtCountFail: (state) =>  {
            state.loading = false;
            state.error= action.payload;
          },
          deleteDistrict: (state) => {
            state.loading = true;
            state.error = null;
          },
          deleteDistrictSuccess: (state, action) => {
            state.loading = false;
            state.districtData =
              action.payload === undefined
                ? current(state.districtData)
                : current(state.districtData).filter((option) => option.id !== action.payload);
   
          },
          deleteDistrictFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          }
    }
  
})


export const{

  getDistrict,
  getDistrictSuccess,
  getDistrictFail,
    addDistrict,
    addDistrictSuccess,
    addDistrictFail,
    getDistrictById,
    getDistrictByIdSuccess,
    getDistrictByIdFail,
    updateDistrict,
    updateDistrictSuccess,
    updateDistrictFail,
    districtCount,
    districtCountSuccess,
    districtCountFail,
    deleteDistrict,
    deleteDistrictSuccess,
    deleteDistrictFail

   
} = districtSlice.actions;

export default districtSlice.reducer;