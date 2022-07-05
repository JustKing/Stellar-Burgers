import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { profile } from '../../interfaces/profile';

const initialState: Omit<profile.user, 'password'> = {
  email: '',
  name: '',
  token: ''
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<profile.user>) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    resetUser(state) {
      state.email = initialState.email;
      state.name = initialState.name;
      state.token = initialState.token;
    }
  }
});

export const { setUser, resetUser } = profileSlice.actions;

export default profileSlice.reducer;
