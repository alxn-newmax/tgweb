import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ContentCopy } from '@mui/icons-material';
import { IconButton, Snackbar } from '@mui/material';
import { SnackbarState } from 'types';
import { ordersSelector } from 'reducers/ordersReducer';
import classes from './Header.module.sass';

export default function Header() {
  const { active } = useSelector(ordersSelector);

  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const handleSnackbarOpen = () => {
    setSnackbarState({ ...snackbarState, open: true });
  };

  const handleSnackbarClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  if (!active.data) return <></>;

  const orderInfo = active.data;

  return (
    <header className={classes.header}>
      <div className={classes.white_space}></div>
      <div className={classes.title}>
        <div className={classes.number}>Order {orderInfo.key}</div>
        <div className={classes.status}>{active.next_status}</div>
      </div>
      <div className={classes.actions}>
        <IconButton
          aria-label="copy"
          color="primary"
          size="medium"
          onClick={() => {
            handleSnackbarOpen();
            navigator.clipboard.writeText(orderInfo.key);
          }}
          sx={{ color: 'var(--link-color)' }}
        >
          <ContentCopy fontSize="small" />
        </IconButton>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: snackbarState.vertical, horizontal: snackbarState.horizontal }}
        open={snackbarState.open}
        onClose={handleSnackbarClose}
        key={orderInfo.id}
        autoHideDuration={800}
        sx={{ top: '15px' }}
      >
        <div className={classes.snackbar_content}>Order number copied</div>
      </Snackbar>
    </header>
  );
}
