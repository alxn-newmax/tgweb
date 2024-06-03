import React from 'react';
import classes from './OrderHistory.module.sass';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { API_URL } from 'config';

export default function Message({ value }: { value: string }) {
  if (!value.startsWith('/images')) {
    return <div className={classes.message}>{value}</div>;
  }

  return (
    <>
      <div className={`${classes.message} ${classes.file}`}>
        <div className={classes.logo}>
          <img src={API_URL + value} alt="file preview" />
        </div>
        <div className={classes.name}>
          <div className="nowrap">{value.split('/').slice(-1)[0]}</div>
        </div>
        <div className={classes.download}>
          <IconButton href={API_URL + value} target="_blank" aria-label="launch" color="primary" size="small">
            <DownloadIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
