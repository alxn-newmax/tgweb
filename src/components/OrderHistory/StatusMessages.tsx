import React from 'react';
import Message from './Message';
import { History } from 'shared/entities';
import classes from './OrderHistory.module.sass';

export default function StatusMessages({ items }: { items: History[] }) {
  const messages: React.JSX.Element[] = [];

  items.forEach((item, key) => item.desc && messages.push(<Message key={key} value={item.desc} />));

  if (!messages.length) return <></>;

  return <div className={classes.status_messages}>{messages}</div>;
}
