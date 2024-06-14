import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import classes from './QuantityOrders.module.sass';

export default function QuantityOrdersSkeleton() {
  return (
    <div className={classes.QuantityOrders}>
      <div className={classes.content}>
        <Skeleton animation="wave">
          <Typography variant="h5">10</Typography>
        </Skeleton>
        <Skeleton animation="wave" width="100px">
          <Typography variant="subtitle2">10</Typography>
        </Skeleton>
      </div>
      <div className={classes.content}>
        <Skeleton animation="wave">
          <Typography variant="h5">10</Typography>
        </Skeleton>
        <Skeleton animation="wave" width="100px">
          <Typography variant="subtitle2">10</Typography>
        </Skeleton>
      </div>
    </div>
  );
}
