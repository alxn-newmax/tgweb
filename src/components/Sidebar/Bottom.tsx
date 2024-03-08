import type { FC } from 'react';
import { Box } from '@mui/material';
import SidebarProfile from './SidebarProfile';

type BottomProps = {
  isOpen: boolean;
  onClose?: () => void;
};

const Bottom: FC<BottomProps> = ({ isOpen, onClose }) => {
  return (
    <Box>
      <SidebarProfile isOpen={isOpen} />
    </Box>
  );
};

export default Bottom;
