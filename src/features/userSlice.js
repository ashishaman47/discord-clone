import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    // login action
    login: (state, action) => {
      // set the user to logged in user
      state.user = action.payload;
    },
    // logout action
    logout: (state, action) => {
      // set user to null
      state.user = null;
    }
  },
});

export const { login, logout } = userSlice.actions;


export const selectUser = state => state.user.user;

export default userSlice.reducer;
