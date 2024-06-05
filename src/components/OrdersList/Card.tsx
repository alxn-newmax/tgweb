import React from 'react';
import { WebApp } from '@grammyjs/web-app';
import { useNavigate } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
import { OrderNext } from 'shared/entities';
import classes from './OrderList.module.sass';

export default function OrderCard({ order }: { order: OrderNext }) {
  let navigate = useNavigate();

  const handleModalClose = () => {
    WebApp.BackButton.hide();
    navigate('/orders');
  };

  const handleOpenOrder = () => {
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(handleModalClose);
    navigate(`/orders/${order.key}`);
  };

  return (
    <Card
      className={`${classes.OrderCard} ${classes[order.status]}`}
      onClick={() => {
        handleOpenOrder();
      }}
    >
      <Typography gutterBottom variant="h5" component="div">
        {order.fk_article_id}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {order.next_status}
      </Typography>
    </Card>
  );
}
