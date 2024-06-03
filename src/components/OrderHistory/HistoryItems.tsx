import React from 'react';
import { History, OrderStatus } from 'shared/entities';
import { statusDescEnum } from 'shared/enums';
import StatusActions from './StatusActions';
import StatusMessages from './StatusMessages';
import classes from './OrderHistory.module.sass';

export default function HistoryItems({
  data,
}: {
  data: { messages: History[]; confirm: boolean; status: OrderStatus };
}) {
  return (
    <div className={classes.status}>
      <div className={classes.title}>{data.status}</div>
      <div className={classes.desc}>{statusDescEnum[data.status]}</div>
      <StatusMessages items={data.messages} />
      {!data.confirm && <StatusActions status={data.status} />}
    </div>
  );
}
