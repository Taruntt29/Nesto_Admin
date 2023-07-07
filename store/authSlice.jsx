import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    brokerID: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setBrokerID: (state, action) => {
      state.brokerID = action.payload;
    },
  },
});

export const { setToken, setBrokerID } = authSlice.actions;

export default authSlice.reducer;
