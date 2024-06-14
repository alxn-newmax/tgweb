import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrdersList from 'components/OrdersList';
import UserProfile from 'components/UserProfile';
import QuantityOrders from 'components/QuantityOrders';
import WebAppContext from 'store/webAppContext';
import { setOrderList } from 'reducers/ordersReducer';
import { OrdersApi } from 'api/OrdersApi';

export default function OrdersListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const webApp = useContext(WebAppContext);

  useEffect(() => {
    async function fetchOrdersList(user_id: string) {
      const orders = await OrdersApi.list(user_id);
      dispatch(setOrderList(orders));
    }

    if (!webApp.user) return navigate('/');

    fetchOrdersList(String(webApp.user.id));
  }, [dispatch, navigate, webApp.user]);

  return (
    <>
      <UserProfile />
      <QuantityOrders />
      <OrdersList />
    </>
  );
}
