import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ContentCopy } from '@mui/icons-material';
import { IconButton, Snackbar } from '@mui/material';
import { SnackbarState } from 'types';
import { ordersSelector } from 'reducers/ordersReducer';
import HeaderSkeleton from './Skeleton';
import classes from './Header.module.sass';

export default function Header() {
  const { t } = useTranslation();
  const { active } = useSelector(ordersSelector);

  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const handleClickCopied = () => {
    handleSnackbarOpen();
    navigator.clipboard.writeText(`#${orderInfo.key}`);
  };

  const handleSnackbarOpen = () => {
    setSnackbarState({ ...snackbarState, open: true });
  };

  const handleSnackbarClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  if (!active.data) return <HeaderSkeleton />;

  const orderInfo = active.data;

  return (
    <header className={classes.header}>
      <div className={classes.white_space}></div>
      <div className={classes.title}>
        <div className={classes.number}>
          {t('header.title')} {orderInfo.key}
        </div>
        <div className={classes.status}>{t(`statusList.${active.next_status}`)}</div>
      </div>
      <div className={classes.actions}>
        <IconButton
          aria-label="copy"
          color="primary"
          size="medium"
          onClick={handleClickCopied}
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
        <div className={classes.snackbar_content}>{t('header.copied')}</div>
      </Snackbar>
    </header>
  );
}
