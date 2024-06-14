import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { WebApp } from '@grammyjs/web-app';
import { Card, Typography } from '@mui/material';
import { OrderNext } from 'shared/entities';
import classes from './OrderList.module.sass';

export default function OrderCard({ order }: { order: OrderNext }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOpenOrder = () => {
    WebApp.BackButton.show();
    navigate(`/orders/${order.key}`);
  };

  return (
    <Card className={`${classes.OrderCard} ${classes[order.status]}`} onClick={() => handleOpenOrder()}>
      <Typography gutterBottom variant="h5" component="div">
        {order.fk_article_id}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t(`statusList.${order.next_status}`)}
      </Typography>
    </Card>
  );
}
