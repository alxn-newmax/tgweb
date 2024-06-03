import { Button } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import classes from './OrderHistory.module.sass';
import AttachModal from './AttachModal';
import { WebApp } from '@grammyjs/web-app';
import { OrderStatus } from 'shared/entities';
import { useParams } from 'react-router-dom';
import { OrdersApi } from 'api/OrdersApi';
import { useDispatch } from 'react-redux';
import { setActiveOrder } from 'reducers/ordersReducer';

const ConfirmButton = styled(Button)({
  padding: '4px 16px',
  fontSize: 14,
  fontWeight: 'normal',
  color: '#000',
  outline: 'none',
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#FFE561',
  border: 'none',
  borderRadius: '80px',
  '&:hover': {
    backgroundColor: '#FFE561',
  },
  '&:active': {
    backgroundColor: '#FFE561',
  },
});

export default function StatusActions({ status }: { status: OrderStatus }) {
  const dispatch = useDispatch();
  const { order_key } = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    WebApp.BackButton.hide();
    setOpen(false);
  };

  const handleModalOpen = () => {
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(handleModalClose);
    setOpen(true);
  };

  const handleUpdateStatus = async () => {
    await OrdersApi.updateStatus('confirm', order_key as string);
    const order = await OrdersApi.byId(order_key as string);
    dispatch(setActiveOrder(order));
  };

  return (
    <div className={classes.status_actions}>
      {status === 'production' && (
        <ConfirmButton size="small" onClick={handleUpdateStatus}>
          In production
        </ConfirmButton>
      )}
      <ConfirmButton size="small" onClick={handleModalOpen}>
        {status === 'production' ? 'Not started' : 'Confirm status'}
      </ConfirmButton>
      <AttachModal open={open} handleModalClose={handleModalClose} />
    </div>
  );
}
