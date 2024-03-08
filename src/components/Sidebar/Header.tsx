import { useState, type FC } from 'react';
import { Box } from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { images } from '../../config/images';

type HeaderProps = {
  isOpen: boolean;
};

function HeaderItem({ isOpen, collapsed }: { isOpen: boolean; collapsed: boolean }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: '8px',
        padding: '8px',
        ':hover': { backgroundColor: '#333333' },
      }}
    >
      <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <img src={images.supplier} alt="avatar" style={{ width: '36px', height: '36px' }} />
        <Box sx={{ opacity: isOpen ? 1 : 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Box sx={{ fontSize: 14, color: '#fff' }}>Мирзоев А. С.</Box>
          <Box sx={{ fontSize: 10, color: '#808080' }}>ID 1189739</Box>
        </Box>
      </Box>
      {!collapsed ? <UnfoldMoreIcon style={{ color: '#ffffff78', opacity: isOpen ? 1 : 0, fontSize: 20 }} /> : ''}
    </Box>
  );
}

function HeaderCollapsedBox({ isOpen, collapsed, list }: { isOpen: boolean; collapsed: boolean; list: number[] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: collapsed ? 'absolute' : 'relative',
        overflowY: collapsed ? 'scroll' : 'auto',
        maxHeight: '280px',
        zIndex: '1300',
        bgcolor: '#333333',
        borderRadius: '8px',
        top: collapsed ? 8 : 0,
        left: 0,
        right: 0,
      }}
    >
      {list.map((item) => (
        <HeaderItem isOpen={isOpen} collapsed={collapsed} />
      ))}
    </Box>
  );
}

const Header: FC<HeaderProps> = ({ isOpen }) => {
  const [collapsed, setCollapsed] = useState(true);
  const arr = [1, 2, 3, 4, 5, 6, 7];
  return (
    <Box
      sx={{ p: '8px 0', minHeight: '68px', position: 'relative' }}
      onClick={() => {
        setCollapsed(!collapsed);
      }}
    >
      <HeaderCollapsedBox isOpen={isOpen} collapsed={collapsed} list={collapsed ? arr : arr.slice(0, 1)} />
    </Box>
  );
};

export default Header;
