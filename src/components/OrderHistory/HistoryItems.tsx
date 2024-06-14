import React from 'react';
import { useTranslation } from 'react-i18next';
import { History, OrderStatus } from 'shared/entities';
import StatusActions from './StatusActions';
import StatusMessages from './StatusMessages';
import classes from './OrderHistory.module.sass';

export default function HistoryItems({
  data,
}: {
  data: { messages: History[]; confirm: boolean; status: OrderStatus };
}) {
  const { t } = useTranslation();
  return (
    <div className={classes.status}>
      <div className={classes.title}>{t(`statusList.${data.status}`)}</div>
      <div className={classes.desc}>{t(`statusDescList.${data.status}`)}</div>
      <StatusMessages items={data.messages} />
      {!data.confirm && <StatusActions status={data.status} />}
    </div>
  );
}
