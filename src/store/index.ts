import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
