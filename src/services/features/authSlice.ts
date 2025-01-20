import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    incremented(state) {
      state.value++;
    },
  },
});

export const { incremented } = authSlice.actions;
export default authSlice.reducer;
