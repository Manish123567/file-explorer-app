import { createSlice } from '@reduxjs/toolkit';
import fileSystemData from '../data/mockFileSystem.json';

// 👇 Clear localStorage here once to load new JSON
localStorage.removeItem('fileSystem'); // ✅ Add this only ONCE

const localData = localStorage.getItem('fileSystem');
const initialState = localData ? JSON.parse(localData) : fileSystemData;

const fileSystemSlice = createSlice({
  name: 'fileSystem',
  initialState,
  reducers: {
    setFileSystem: (state, action) => {
      const data = action.payload;
      localStorage.setItem('fileSystem', JSON.stringify(data));
      return data;
    }
  }
});

export const { setFileSystem } = fileSystemSlice.actions;
export default fileSystemSlice.reducer;
