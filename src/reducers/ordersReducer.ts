import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { Order, History, OrderStatus } from 'shared/entities';

interface ActiveOrder {
  data: Order | null;
  history: {
    messages: History[];
    confirm: boolean;
    status: OrderStatus;
  }[];
}

export interface OrdersState {
  list: Order[];
  active: ActiveOrder;
}

const initialState: OrdersState = {
  list: [],
  active: {
    data: null,
    history: [],
  },
};

const orderReducer = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderList: (state: OrdersState, action: PayloadAction<Order[]>) => {
      state.list = action.payload;
    },
    setActiveOrder: (state: OrdersState, action: PayloadAction<ActiveOrder>) => {
      state.active = action.payload;
    },
  },
});

export const { setOrderList, setActiveOrder } = orderReducer.actions;

export const ordersSelector = (state: RootState) => {
  return state.orders;
};

export default orderReducer.reducer;
