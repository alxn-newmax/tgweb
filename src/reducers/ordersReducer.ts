import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Order, History, OrderStatus, OrderNext } from 'shared/entities';

interface ActiveOrder {
  data: Order | null;
  history: {
    messages: History[];
    confirm: boolean;
    status: OrderStatus;
  }[];
  next_status: OrderStatus;
}

export interface OrdersState {
  list: OrderNext[];
  active: ActiveOrder;
}

const initialState: OrdersState = {
  list: [],
  active: {
    data: null,
    history: [],
    next_status: 'read',
  },
};

const orderReducer = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderList: (state: OrdersState, action: PayloadAction<OrderNext[]>) => {
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
