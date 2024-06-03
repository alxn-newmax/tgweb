import React from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ButtonInputFile({ handleChangeInputFile }: { handleChangeInputFile: (e: any) => void }) {
  return (
    <Button
      onChange={handleChangeInputFile}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<AttachFileIcon />}
      size="large"
      sx={{
        padding: '8px',
        borderRadius: '50%',
        bgcolor: 'transparent',
        color: '#000',
        boxShadow: 'none',
        ':hover': {
          bgcolor: 'transparent !important',
          boxShadow: 'none',
        },
        minWidth: 0,
        span: {
          margin: 0,
        },
      }}
    >
      <VisuallyHiddenInput type="file" accept="image/png, image/gif, image/jpeg" />
    </Button>
  );
}
