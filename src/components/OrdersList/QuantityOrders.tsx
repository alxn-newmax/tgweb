import React from 'react';
import { useSelector } from 'react-redux';
import { ordersSelector } from 'reducers/ordersReducer';
import classes from './OrderList.module.sass';

export default function QuantityOrders() {
  const { list } = useSelector(ordersSelector);

  return (
    <div className={classes.QuantityOrders}>
      <div className={classes.content}>
        <div className={classes.qty}>{list.length}</div>
        <div className={classes.desc}>Active orders</div>
      </div>
    </div>
  );
}