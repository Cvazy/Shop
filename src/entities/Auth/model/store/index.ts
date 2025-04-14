import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthSchema {
  isAuth: boolean | null;
  isLoading: boolean;
  error?: string | undefined;
}

const initialState: IAuthSchema = {
  isAuth: null,
  error: undefined,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { actions: authActions } = authSlice;
