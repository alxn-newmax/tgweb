import { useState } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import sidebarList from '../../config/sidebarList';
import Header from './Header';
import Content from './Content';
import { Box } from '@mui/material';
import './Sidebar.sass';
import Bottom from './Bottom';

const openedMixin = (theme: Theme): CSSObject => ({
  width: 290,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: '#2C2C2C',
  overflowX: 'hidden',
  zIndex: 899,
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: 52 + 2 * 16,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#2C2C2C',
  overflowX: 'hidden',
  zIndex: 899,
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: 290,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const [open, setOpen] = useState(true);

  const handleDrawerClose = () => setOpen(!open);

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        '& .MuiPaper-root': {
          border: 'none',
        },
      }}
    >
      <Box sx={{ padding: '30px 16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Header isOpen={open} onClose={handleDrawerClose} />
        <Divider sx={{ m: '15px 0', borderColor: '#333333', borderWidth: 2 }} />
        <Content isOpen={open} list={sidebarList} />
        <Bottom isOpen={open} />
      </Box>
    </Drawer>
  );
}
