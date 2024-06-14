import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from 'components/Header';
import FileInfo from 'components/FileInfo';
import OrderHistory from 'components/OrderHistory';
import { setActiveOrder } from 'reducers/ordersReducer';
import { OrdersApi } from 'api/OrdersApi';

export default function OrdersInfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order_key } = useParams();

  useEffect(() => {
    async function fetchMe() {
      const { order, error } = await OrdersApi.byId(order_key as string);

      if (error || !order) return navigate('/orders');

      dispatch(setActiveOrder(order));
    }

    fetchMe();
  }, [dispatch, navigate, order_key]);

  return (
    <>
      <Header />
      <FileInfo />
      <OrderHistory />
    </>
  );
}
