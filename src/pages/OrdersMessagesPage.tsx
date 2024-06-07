import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from 'components/Header';
import MessagesList from 'components/MessageList';
import MessagesFooter from 'components/MessagesFooter';
import { OrdersApi } from 'api/OrdersApi';
import { setActiveOrder } from 'reducers/ordersReducer';

export default function OrdersMessagesPage() {
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
      <MessagesList />
      <MessagesFooter />
    </>
  );
}
