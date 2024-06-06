import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { WebApp } from '@grammyjs/web-app';
import styled from 'styled-components';
import { Button } from '@mui/material';
import AttachModal from './AttachModal';
import { OrderStatus } from 'shared/entities';
import { setActiveOrder } from 'reducers/ordersReducer';
import { OrdersApi } from 'api/OrdersApi';
import classes from './OrderHistory.module.sass';

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
  const navigate = useNavigate();
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
    await OrdersApi.updateStatus('update_time', order_key as string);
    const { order, error } = await OrdersApi.byId(order_key as string);

    if (error || !order) return navigate('/orders');

    dispatch(setActiveOrder(order));
  };

  return (
    <div className={classes.status_actions}>
      {status === 'delivery' && (
        <ConfirmButton size="small" onClick={handleUpdateStatus}>
          In production
        </ConfirmButton>
      )}
      <ConfirmButton size="small" onClick={handleModalOpen}>
        Confirm status
      </ConfirmButton>
      <AttachModal open={open} handleModalClose={handleModalClose} />
    </div>
  );
}
