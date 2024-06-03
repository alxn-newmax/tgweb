import { IconButton } from '@mui/material';
import { images } from 'config/images';
import React from 'react';
import { useSelector } from 'react-redux';
import { ordersSelector } from 'reducers/ordersReducer';
import LaunchIcon from '@mui/icons-material/Launch';
import { API_URL } from 'config';
import classes from './OrderCard.module.sass';

export default function OrderCard() {
  const { active } = useSelector(ordersSelector);

  if (!active.data) return <></>;

  const orderInfo = active.data;

  return (
    <div className={classes.order_card}>
      <div className={classes.file_type}>
        <img src={images.excel_misc} alt="excel misc" />
      </div>
      <div className="file-name">
        <div className={classes.title}>{orderInfo.fk_article_id}</div>
        <div className={classes.file}>{orderInfo.doc_title + '.xlsx'}</div>
        <div className={classes.date}>{orderInfo.doc_date}</div>
      </div>
      <div className={classes.actions}>
        <IconButton
          href={API_URL + orderInfo.doc_link}
          target="_blank"
          aria-label="launch"
          color="primary"
          size="small"
        >
          <LaunchIcon />
        </IconButton>
      </div>
    </div>
  );
}
