import React from 'react';
import { Skeleton } from '@mui/material';
import classes from './OrderList.module.sass';

export default function OrdersListSkeleton() {
  return (
    <div className={classes.OrderList}>
      {[0, 1, 2, 3].map((item, key) => (
        <Skeleton className={classes.OrderCard} animation="wave" />
      ))}
    </div>
  );
}
