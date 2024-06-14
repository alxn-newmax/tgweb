import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ordersSelector } from 'reducers/ordersReducer';
import classes from './OrderList.module.sass';

export default function QuantityOrders() {
  const { t } = useTranslation();
  const { list } = useSelector(ordersSelector);

  const active = list.filter((item) => item.status !== 'delivery');

  return (
    <div className={classes.QuantityOrders}>
      <div className={classes.content}>
        <div className={classes.qty}>{active.length}</div>
        <div className={classes.desc}>{t('quantityOrders.active')}</div>
      </div>
      <div className={classes.content}>
        <div className={classes.qty}>{list.length}</div>
        <div className={classes.desc}>{t('quantityOrders.total')}</div>
      </div>
    </div>
  );
}
