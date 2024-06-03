import React from 'react';
import { useSelector } from 'react-redux';
import { ordersSelector } from 'reducers/ordersReducer';
import HistoryItems from './HistoryItems';
import classes from './OrderHistory.module.sass';

export default function OrderHistory() {
  const { active } = useSelector(ordersSelector);

  if (!active.history.length) return <></>;

  return (
    <div className={classes.OrderHistory}>
      {active.history.map((statusData, key) => (
        <HistoryItems key={key} data={statusData} />
      ))}
    </div>
  );
}
