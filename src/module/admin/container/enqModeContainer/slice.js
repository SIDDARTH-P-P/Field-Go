import { createSlice, current } from '@reduxjs/toolkit';


const enqmodeSlice = createSlice({
    name: '/enqMode',
    initialState: {
        enqModeData: [],
        loading: false,
        error: null,
        enqModeCount:0,
          enqModeByIdData: {}

    },
    reducers: {
        addEnqMode: (state) => {
            state.loading = true;
            state.error = null;
        },
        addEnqModeSuccess: (state, action) => {
            state.loading = false;
            state.enqModeData = action.payload;
        },
        addEnqModeFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getEnqMode: (state) => {
            state.loading = true;
            state.error = null;
        },
        getEnqModeSuccess: (state, action) => {
            state.loading = false;
            state.enqModeData = action.payload;

        },
        getEnqModeFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;

        },
        getEnqModeById: (state) => {
            state.loading = true;
            state.error = null;
          },
          getEnqModeByIdSuccess: (state, action) => {
            state.loading = false;
            state.enqModeByIdData = action.payload;
          },
          getEnqModeByIdFail: (state, action) => {
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
            state.enqModeCount = action.payload.count;
          },
          totalCountFail: (state, action) => {
            state.loading = false;
            state.error = action.payload.count;
          },
          updateEnqMode: (state) => {
            state.loading = true;
            state.error = null;
          },
          
          updateEnqModeSuccess: (state, action) => {
            state.loading = false;
            if (action.payload && action.payload.success) {
              state.enqModeData = state.enqModeData.map((Data) =>
                Data.id === action.payload.id ? action.payload : Data
              );
            } else {
              console.error('Update unsuccessful');
            }
          },
          updateEnqModeFail: (state, action) => {
            alert('hey i am not here', action.payload);
      
            state.loading = false;
            state.error = action.payload;
          },
          deleteEnqMode: (state) => {
            state.loading = true;
            state.error = null;
          },
          deleteEnqModeSuccess: (state, action) => {
            state.loading = false;
            state.enqModeData =
              action.payload === undefined
                ? current(state.enqModeData)
                : current(state.enqModeData).filter((option) => option.id !== action.payload);
            //  state.countryData.filter((Data) => Data.id !== action.payload);
          },
          deleteEnqModeFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          }
      
    }
});


export const {

    getEnqMode,getEnqModeSuccess,getEnqModeFail,
    addEnqMode,addEnqModeSuccess,addEnqModeFail,
    getEnqModeById,getEnqModeByIdSuccess,getEnqModeByIdFail,

    totalCount,totalCountSuccess,totalCountFail,
    updateEnqMode,updateEnqModeSuccess,updateEnqModeFail,
    deleteEnqMode,deleteEnqModeSuccess,deleteEnqModeFail
} = enqmodeSlice.actions;

export default enqmodeSlice.reducer;