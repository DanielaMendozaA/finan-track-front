import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, clearToken } = userSlice.actions;
export default userSlice.reducer;
