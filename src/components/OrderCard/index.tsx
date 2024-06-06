import React from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { images } from 'config/images';
import { ordersSelector } from 'reducers/ordersReducer';
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
          href={orderInfo.doc_link}
          target="_blank"
          aria-label="launch"
          size="small"
          sx={{ color: 'var(--link-color)' }}
        >
          <LaunchIcon />
        </IconButton>
      </div>
    </div>
  );
}
