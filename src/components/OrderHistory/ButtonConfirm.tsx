import React from 'react';
import { Button } from '@mui/material';

export default function ButtonConfirm({
  type,
  disabled,
  handleConfirm,
}: {
  type: 'photo' | 'message';
  disabled: boolean;
  handleConfirm: (e: any) => void;
}) {
  return (
    <Button
      variant="contained"
      sx={{
        width: '100%',
        padding: '15px',
        margin: '0 auto',
        borderRadius: '15px',
        bgcolor: '#FFE561',
        color: '#000',
        boxShadow: '4px 8px 16px rgba(12, 12, 12, 0.1)',
        ':not(.Mui-disabled):hover': {
          bgcolor: '#FFE561 !important',
          boxShadow: '4px 8px 16px rgba(12, 12, 12, 0.15) !important',
        },
      }}
      onClick={handleConfirm}
      disabled={disabled}
    >
      {`Send ${type}`}
    </Button>
  );
}
