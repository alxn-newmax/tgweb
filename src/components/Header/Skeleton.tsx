import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import classes from './Header.module.sass';

export default function HeaderSkeleton() {
  return (
    <header className={classes.header}>
      <div className={classes.white_space}></div>
      <div className={classes.title}>
        <div className={classes.number}>
          <Skeleton animation="wave">
            <Typography variant="inherit">7121-15_54</Typography>
          </Skeleton>
        </div>
        <div className={classes.status}>
          <Skeleton animation="wave">
            <Typography variant="inherit">unread</Typography>
          </Skeleton>
        </div>
      </div>
      <div className={classes.actions}>
        <Skeleton animation="wave" variant="circular" height={32} width={32} />
      </div>
    </header>
  );
}
