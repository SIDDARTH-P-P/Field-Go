// import { createSlice } from '@reduxjs/toolkit';


// const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//       userData: [],
//       loading: false,
//       error: null,
//     },
//     reducers: {
//         getUser: (state) => {
//             state.loading = true;
//             state.error = null;
//           },
//         getUserSuccess: (state, action) => {
//             state.loading = false;
//             state.countryData = action.payload;
//           },
      
//         getUserFail: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//           },
//     }
// });

// export const{
//     getUser,
//     getUserSuccess,
//     getUserFail
// } = userSlice.actions;

// export default userSlice.reducer;