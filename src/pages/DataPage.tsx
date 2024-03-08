import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

export default function DataPage() {
  const [warehouse, setWarehouse] = useState([]);

  useEffect(() => {
    fetchMe();

    async function fetchMe() {
      const res = await fetch('http://localhost:5500/api/v2/wh', { method: 'GET' });
      const body = await res.json();
      setWarehouse(body.data);
    }
  });

  return (
    <Box>
      {warehouse.map((item, i) => (
        <div>123</div>
      ))}
    </Box>
  );
}
