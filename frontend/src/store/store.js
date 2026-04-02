import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, theme: 'light' },
  reducers: {
    setAuth: (state, action) => ({ ...state, ...action.payload }),
    logout: (state) => ({ ...state, user: null, token: null }),
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', state.theme === 'dark');
    }
  }
});

export const { setAuth, logout, toggleTheme } = authSlice.actions;
export const store = configureStore({ reducer: { auth: authSlice.reducer } });
