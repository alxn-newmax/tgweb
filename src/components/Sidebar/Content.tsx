import type { FC } from 'react';
import { Icon } from '@iconify/react';
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

type ContentProps = {
  list: SidebarListItem[];
  isOpen: boolean;
};

type SidebarListItem = {
  link: string;
  icon: string;
  label: string;
};

const Content: FC<ContentProps> = ({ list, isOpen }) => {
  const location = useLocation();
  const currentTab = location.pathname;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      {list.map((el, index) => (
        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            to={el.link}
            classes={{ root: `ListItemButton ${currentTab === el.link ? 'active' : ''}` }}
            sx={{ justifyContent: isOpen ? 'initial' : 'center' }}
          >
            <ListItemIcon classes={{ root: 'ListItemIcon' }} sx={{ mr: isOpen ? 2 : 'auto' }}>
              <Icon icon={el.icon} />
            </ListItemIcon>
            <ListItemText primary={el.label} classes={{ root: 'ListItemText' }} sx={{ opacity: isOpen ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </Box>
  );
};

export default Content;
