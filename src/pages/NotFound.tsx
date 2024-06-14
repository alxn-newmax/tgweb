import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, SxProps, Theme } from '@mui/material';
import { images } from 'config/images';
import WebAppContext from 'store/webAppContext';

const buttonStyles: SxProps<Theme> = {
  bgcolor: 'var(--button-color)',
  borderRadius: '30px',
  ':hover': {
    bgcolor: 'var(--button-color)',
  },
};

export default function NotFound() {
  const { t } = useTranslation();
  const webApp = useContext(WebAppContext);

  const toNavigate = webApp.user ? '/orders' : '/';

  return (
    <div id="not_found">
      <div className="box">
        <div className="title">{t('notFoundPage.title')}</div>
        <div className="desc">{t('notFoundPage.desc')}</div>
      </div>
      <img src={images.not_found} alt="not found" />
      <Button component={Link} to={toNavigate} variant="contained" color="primary" sx={buttonStyles}>
        {t('notFoundPage.backBtn')}
      </Button>
    </div>
  );
}
