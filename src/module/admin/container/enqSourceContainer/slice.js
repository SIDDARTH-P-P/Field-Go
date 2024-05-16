import { createSlice, current } from '@reduxjs/toolkit';


const enqsourceSlice = createSlice({
    name: '/enqSource',
    initialState: {
        enqsourceData: [],
        loading: false,
        error: null,
          enqsourceCount:0,
          enqsourceByIdData: {}

    },
    reducers: {
        addEnqSource: (state) => {
            state.loading = true;
            state.error = null;
        },
        addEnqSourceSuccess: (state, action) => {
            state.loading = false;
            state.enqsourceData = action.payload;
        },
        addEnqSourceFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getEnqSource: (state) => {
            state.loading = true;
            state.error = null;
        },
        getEnqSourceSuccess: (state, action) => {
            state.loading = false;
            state.enqsourceData = action.payload;

        },
        getEnqSourceFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;

        },
        getEnqSourceById: (state) => {
            state.loading = true;
            state.error = null;
          },
          getEnqSourceByIdSuccess: (state, action) => {
            state.loading = false;
            state.enqsourceByIdData = action.payload;
          },
          getEnqSourceByIdFail: (state, action) => {
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
            state.enqsourceCount = action.payload.count;
          },
          totalCountFail: (state, action) => {
            state.loading = false;
            state.error = action.payload.count;
          },
          updateEnqSource: (state) => {
            state.loading = true;
            state.error = null;
          },
          
          updateEnqSourceSuccess: (state, action) => {
            state.loading = false;
            if (action.payload && action.payload.success) {
              state.enqsourceData = state.enqsourceData.map((Data) =>
                Data.id === action.payload.id ? action.payload : Data
              );
            } else {
              console.error('Update unsuccessful');
            }
          },
          updateEnqSourceFail: (state, action) => {
            alert('hey i am not here', action.payload);
      
            state.loading = false;
            state.error = action.payload;
          },
          deleteEnqSource: (state) => {
            state.loading = true;
            state.error = null;
          },
          deleteEnqSourceSuccess: (state, action) => {
            state.loading = false;
            state.enqsourceData =
              action.payload === undefined
                ? current(state.enqsourceData)
                : current(state.enqsourceData).filter((option) => option.id !== action.payload);
            //  state.countryData.filter((Data) => Data.id !== action.payload);
          },
          deleteEnqSourceFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          }
      
    }
});


export const {

    getEnqSource,
    getEnqSourceSuccess,
    getEnqSourceFail,
    addEnqSource,
    addEnqSourceSuccess,
    addEnqSourceFail,
    getEnqSourceById,getEnqSourceByIdSuccess,getEnqSourceByIdFail,
    totalCount,totalCountSuccess,totalCountFail,
    updateEnqSource,updateEnqSourceSuccess,updateEnqSourceFail,
    deleteEnqSource,deleteEnqSourceSuccess,deleteEnqSourceFail
} = enqsourceSlice.actions;

export default enqsourceSlice.reducer;