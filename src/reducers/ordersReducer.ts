import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Order, History, OrderStatus, OrderNext } from 'shared/entities';

export interface IHistory {
  messages: History[];
  confirm: boolean;
  status: OrderStatus;
}

interface ActiveOrder {
  data: Order | null;
  history: IHistory[];
  next_status: OrderStatus;
}

export interface OrdersState {
  list: OrderNext[];
  active: ActiveOrder;
  listLoading: boolean;
}

const initialState: OrdersState = {
  list: [],
  active: {
    data: null,
    history: [],
    next_status: 'fabric',
  },
  listLoading: false,
};

const orderReducer = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderList: (state: OrdersState, action: PayloadAction<OrderNext[]>) => {
      state.list = action.payload;
      state.listLoading = true;
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
