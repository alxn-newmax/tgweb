import React from 'react';
import { Skeleton } from '@mui/material';

export default function OrderHistorySkeleton() {
  return (
    <div style={{ margin: 'var(--root-padding)' }}>
      {[1, 2, 3].map((_) => (
        <Skeleton animation="wave" height="120px" style={{ marginBottom: '8px' }} />
      ))}
    </div>
  );
}
