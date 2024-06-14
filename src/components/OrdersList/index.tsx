import React from 'react';
import { useSelector } from 'react-redux';
import OrderCard from './Card';
import { ordersSelector } from 'reducers/ordersReducer';
import OrdersListSkeleton from './Skeleton';
import classes from './OrderList.module.sass';

export default function OrdersList() {
  const { list, listLoading } = useSelector(ordersSelector);

  if (!listLoading) return <OrdersListSkeleton />;

  return (
    <div className={classes.OrderList}>
      {list.map((item, key) => (
        <OrderCard order={item} key={key} />
      ))}
    </div>
  );
}
