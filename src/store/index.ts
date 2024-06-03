import { configureStore } from '@reduxjs/toolkit';
import commonReducer from 'reducers/commonReducer';
import ordersReducer from 'reducers/ordersReducer';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    orders: ordersReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
