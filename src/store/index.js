import { configureStore } from '@reduxjs/toolkit';
import fileSystemReducer from './fileSystemSlice';

export default configureStore({
  reducer: {
    fileSystem: fileSystemReducer,
  },
});