import React from 'react';
import moment from 'moment';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { API_URL } from 'config';
import classes from './OrderHistory.module.sass';

export default function Message({ value, time }: { value: string; time?: string }) {
  if (!value.startsWith('/images')) {
    return (
      <div className={`${classes.row} ${time && classes.type_chat}`}>
        <div className={classes.message_out}>
          <div className={classes.message}>
            <div className={classes.text}>{value}</div>
            <div className={classes.time}>{time && moment(time, 'x').format('DD MMM HH:mm')}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`${classes.row} ${time && classes.type_chat}`}>
        <div className={classes.message_out}>
          <div className={classes.message}>
            <div className={classes.file}>
              <div className={classes.logo}>
                <img src={API_URL + value} alt="file preview" />
              </div>
              <div className={classes.name}>
                <div className="nowrap">{value.split('/').slice(-1)[0]}</div>
              </div>
              <div className={classes.download}>
                <IconButton
                  href={API_URL + value}
                  target="_blank"
                  aria-label="launch"
                  size="small"
                  sx={{ color: 'var(--link-color)' }}
                >
                  <DownloadIcon />
                </IconButton>
              </div>
            </div>
            <div className={classes.time}>{time && moment(time, 'x').format('DD MMM HH:mm')}</div>
          </div>
        </div>
      </div>
    </>
  );
}
