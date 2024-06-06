import React from 'react';
import { IHistory } from 'reducers/ordersReducer';
import classes from './OrderHistory.module.sass';
import { images } from 'config/images';
import Message from './Message';
import { History } from 'shared/entities';

export default function MessagesList({ list }: { list: IHistory[] }) {
  const items = list.reduce((acc: History[], item) => {
    acc.push(...item.messages);
    return acc;
  }, []);

  if (!items.length) {
    return (
      <div className={`${classes.messages_list} ${classes.center}`}>
        <img src={images.null} alt="null" />
      </div>
    );
  }

  return (
    <div className={classes.messages_list}>
      <div className={classes.list}>
        {items.map((item, key) => (
          <Message key={key} value={item.desc} time={item.created_at} />
        ))}
      </div>
    </div>
  );
}
