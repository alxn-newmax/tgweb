import React from 'react';
import Message from './Message';
import { History } from 'shared/entities';
import classes from './OrderHistory.module.sass';

export default function StatusMessages({ items }: { items: History[] }) {
  const messages: React.JSX.Element[] = [];

  items.forEach((item) => item.desc && messages.push(<Message value={item.desc} />));

  if (!messages.length) return <></>;

  return <div className={classes.status_messages}>{messages}</div>;
}
