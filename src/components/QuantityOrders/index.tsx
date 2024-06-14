import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ordersSelector } from 'reducers/ordersReducer';
import QuantityOrdersSkeleton from './Skeleton';
import classes from './QuantityOrders.module.sass';

export default function QuantityOrders() {
  const { t } = useTranslation();
  const { list, listLoading } = useSelector(ordersSelector);

  const totalQty = list.length;
  const activeQty = list.filter((item) => item.status !== 'done').length;

  if (!listLoading) return <QuantityOrdersSkeleton />;

  return (
    <div className={classes.QuantityOrders}>
      <div className={classes.content}>
        <div className={classes.qty}>{activeQty}</div>
        <div className={classes.desc}>{t('quantityOrders.active')}</div>
      </div>
      <div className={classes.content}>
        <div className={classes.qty}>{totalQty}</div>
        <div className={classes.desc}>{t('quantityOrders.total')}</div>
      </div>
    </div>
  );
}
