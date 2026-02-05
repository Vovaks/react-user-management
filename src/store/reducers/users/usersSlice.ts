import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UsersState } from '../../../types/users.types';

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
});

const initialState: UsersState = {
  list: [],
  search: '',
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.list.push(action.payload);
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.list = state.list.filter(u => u.id !== action.payload);
    },
    updateUser(state, action: PayloadAction<User>) {
      state.list = state.list.map(u =>
        u.id === action.payload.id ? action.payload : u
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error';
      });
  },
});

export const { setSearch, addUser, deleteUser, updateUser } =
  usersSlice.actions;

export default usersSlice.reducer;
