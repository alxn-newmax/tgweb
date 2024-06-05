import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OrdersList from 'components/OrdersList';
import UserProfile from 'components/UserProfile';
import QuantityOrders from 'components/OrdersList/QuantityOrders';
import WebAppContext from 'store/webAppContext';
import { setOrderList } from 'reducers/ordersReducer';
import { OrdersApi } from 'api/OrdersApi';

export default function OrdersListPage() {
  const dispatch = useDispatch();
  const webApp = useContext(WebAppContext);

  useEffect(() => {
    async function fetchMe(user_id: string) {
      const orders = await OrdersApi.list(user_id);
      dispatch(setOrderList(orders));
    }

    webApp.user.id && fetchMe(String(webApp.user.id));
  }, [dispatch, webApp.user.id]);

  return (
    <>
      <UserProfile />
      <QuantityOrders />
      <OrdersList />
    </>
  );
}
