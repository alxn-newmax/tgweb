import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
  const webApp = useContext(WebAppContext);

  const toNavigate = webApp.user.id ? '/orders' : '/';

  return (
    <div id="not_found">
      <div className="box">
        <div className="title">404: The page you are looking for isn’t here</div>
        <div className="desc">
          You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation
        </div>
      </div>
      <img src={images.not_found} alt="not found" />
      <Button component={Link} to={toNavigate} variant="contained" color="primary" sx={buttonStyles}>
        Go back to Main page
      </Button>
    </div>
  );
}
