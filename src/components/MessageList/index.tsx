import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { images } from 'config/images';
import Message from '../OrderHistory/Message';
import { History } from 'shared/entities';
import { ordersSelector } from 'reducers/ordersReducer';
import classes from './MessageList.module.sass';

export default function MessagesList() {
  const { active } = useSelector(ordersSelector);
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [active]);

  const items = active.history.reduce((acc: History[], item) => {
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
    <div id="messages-list" className={classes.messages_list}>
      <div className={classes.list}>
        {items.map((item, key) => (
          <Message key={key} value={item.desc} time={item.created_at} />
        ))}
      </div>
      <div ref={scrollRef}></div>
    </div>
  );
}
