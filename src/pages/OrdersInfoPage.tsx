import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from 'components/Header';
import { OrdersApi } from 'api/OrdersApi';
import OrderCard from 'components/OrderCard';
import { useDispatch } from 'react-redux';
import { setActiveOrder } from 'reducers/ordersReducer';
import OrderHistory from 'components/OrderHistory';

export default function OrdersInfoPage() {
  const dispatch = useDispatch();
  const { order_key } = useParams();

  useEffect(() => {
    async function fetchMe() {
      const order = await OrdersApi.byId(order_key as string);
      dispatch(setActiveOrder(order));
    }

    fetchMe();
  }, [dispatch, order_key]);

  return (
    <>
      <Header />
      <OrderCard />
      <OrderHistory />
    </>
  );
}
