import { createSlice, current } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: [],
    userMeData: {},
    loading: false,
    error: null,
    userCount: 0,
    userByIdData: {}
  },
  reducers: {
    addUser: (state) => {
      state.loading = true;
      state.error = null;
    },
    addUserSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
    addUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getUser: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },

    getUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // -----------------------------------
    getUserMe: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserMeSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },

    getUserMeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // -----------------------------------------

    getUserById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserByIdSuccess: (state, action) => {
      state.loading = false;
      state.userByIdData = action.payload;
    },
    getUserByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },

    totalCountSuccess: (state, action) => {
      state.loading = false;
      state.userCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateUser: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.userData = state.userData.map((user) => (user.id === action.payload.id ? action.payload : user));
    },

    updateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUser: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.userData =
        action.payload === undefined ? current(state.userData) : current(state.userData).filter((option) => option.id !== action.payload);
    },
    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

    // deleteUser: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // deleteUserSuccess: (state, action) => {
    //   state.loading = false;
    //    state.userData = state.userData.filter(user => user.id !== action.payload);
    // },
    // deleteUserFail: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
  }
});

export const {
  addUser,
  addUserSuccess,
  addUserFail,
  getUser,
  getUserSuccess,
  getUserFail,
  getUserById,
  getUserByIdSuccess,
  getUserByIdFail,
  totalCount,
  totalCountSuccess,
  totalCountFail,
  updateUser,
  updateUserSuccess,
  updateUserFail,
  deleteUser,
  deleteUserSuccess,
  deleteUserFail,

  getUserMe,
  getUserMeSuccess,
  getUserMeFail
} = userSlice.actions;

export default userSlice.reducer;
