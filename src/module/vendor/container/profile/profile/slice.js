import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileData: [],
    loading: false,
    error: null,
    profileByIdData: {}
  },
  reducers: {
    // GET
    getProfile: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProfileSuccess: (state, action) => {
      console.log("=======get success===", action.payload);

      state.loading = false;
      state.profileData = action.payload;
    },
    getProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ADD
    addProfile: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProfileSuccess: (state, action) => {
      state.loading = false;
      state.profileData = action.payload;
    },
    addProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // GET BY ID
    getProfileById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProfileByIdSuccess: (state, action) => {
      console.log("=======useprof success===", action.payload);
      
      state.loading = false;
      state.profileByIdData = action.payload;  
    },
    getProfileByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update
    updateProfile: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      console.log('================action.payload====================', action.payload);
      state.loading = false;
      state.profileByIdData = action.payload; // Update the profileByIdData with the new data
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  // GET
  getProfile,
  getProfileSuccess,
  getProfileFail,
  // Add
  addProfile,
  addProfileSuccess,
  addProfileFail,
  // GET BY ID
  getProfileById,
  getProfileByIdSuccess,
  getProfileByIdFail,
  // Update
  updateProfile,
  updateProfileSuccess,
  updateProfileFail
} = profileSlice.actions;

export default profileSlice.reducer;
