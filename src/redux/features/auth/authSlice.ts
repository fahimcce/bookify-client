import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";

type TAuthState = {
  user: null | object;
  token: null | string;
  loading: boolean;
  error: null | string;
  success: boolean; // To track if sign-up is successful
};

const initialState: TAuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  success: false,
};

// Async thunk for signing up
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    {
      name,
      email,
      password,
      phone,
      address,
    }: {
      name: string;
      email: string;
      password: string;
      phone: string;
      address: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/signup", {
        name,
        email,
        password,
        phone,
        address,
        role: "USER", // Default role as "USER"
      });
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Sign-up failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.loading = false;
        state.success = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { setUser, logout, clearSuccess } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
export const useAuthLoading = (state: RootState) => state.auth.loading;
export const useAuthError = (state: RootState) => state.auth.error;
export const useAuthSuccess = (state: RootState) => state.auth.success;
