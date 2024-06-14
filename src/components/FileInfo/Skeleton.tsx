import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import { images } from 'config/images';
import classes from './FileInfo.module.sass';

export default function FileInfoSkeleton() {
  return (
    <div className={classes.FileInfo}>
      <div className={classes.file_type}>
        <img src={images.excel_misc} alt="excel misc" />
      </div>
      <div className={classes.info}>
        <Skeleton animation="wave">
          <Typography className={classes.title}>7121-15</Typography>
        </Skeleton>
        <Skeleton animation="wave">
          <Typography className={classes.file}>912 на 2024.xlsx</Typography>
        </Skeleton>
        <Skeleton animation="wave">
          <Typography className={classes.date}>2024-01-01</Typography>
        </Skeleton>
      </div>
      <div className={classes.actions}>
        <Skeleton animation="wave" variant="circular" height={32} width={32} />
      </div>
    </div>
  );
}
