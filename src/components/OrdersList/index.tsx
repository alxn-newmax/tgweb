import React from 'react';
import { useSelector } from 'react-redux';
import OrderCard from './Card';
import { ordersSelector } from 'reducers/ordersReducer';
import classes from './OrderList.module.sass';

export default function OrdersList() {
  const { list } = useSelector(ordersSelector);

  return (
    <div className={classes.OrderList}>
      {list.map((item, key) => (
        <OrderCard order={item} key={key} />
      ))}
    </div>
  );
}
