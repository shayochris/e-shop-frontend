import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  userId: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
}

interface authSlice {
  tokens: string | null;
  user: User | null;
  isLoading: boolean;
}

const initialState: authSlice = {
  tokens: null,
  user: null,
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<string | null>) => {
      state.tokens = action.payload;
      if (typeof window !== undefined) {
        if (action.payload) {
          localStorage.setItem("tokens", JSON.stringify(action.payload));
        } else {
          localStorage.removeItem("tokens");
        }
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        const savedTokens = localStorage.getItem("tokens");
        const savedUser = localStorage.getItem("user");
        state.tokens = savedTokens ? JSON.parse(savedTokens) : null;
        state.user = savedUser ? JSON.parse(savedUser) : null;
      }
      state.isLoading = false;
    },
    logout: (state) => {
      state.isLoading = true;
      state.tokens = null;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("tokens");
        localStorage.removeItem("user");
      }
      state.isLoading = false;
    },
  },
});

export const { setTokens, setUser, initializeAuth, logout } = authSlice.actions;
export default authSlice.reducer;
