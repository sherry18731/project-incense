import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null; // 這裡確保 state.auth 仍然是一個物件，而不是 undefined
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
