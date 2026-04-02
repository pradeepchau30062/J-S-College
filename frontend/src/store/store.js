import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialTheme = localStorage.getItem('theme') || 'light';
document.documentElement.classList.toggle('dark', initialTheme === 'dark');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),
    theme: initialTheme
  },
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', state.token);
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', state.theme === 'dark');
      localStorage.setItem('theme', state.theme);
    }
  }
});

export const { setAuth, logout, toggleTheme } = authSlice.actions;

export const store = configureStore({ reducer: { auth: authSlice.reducer } });
