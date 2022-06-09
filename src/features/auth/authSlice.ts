import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
interface AuthState {
  existUser: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  existUser: false,
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
