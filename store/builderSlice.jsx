import { createSlice } from '@reduxjs/toolkit';

const builderSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    builderId: null,
  },
  reducers: {
    setBuilderId: (state, action) => {
      state.builderId = action.payload;
    },
  },
});

export const { setToken, setBuilderId } = builderSlice.actions;

export default authSlice.reducer;
