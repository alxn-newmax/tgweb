import { useEffect, useState } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import { GridDeleteIcon, GridFilterListIcon } from '@mui/x-data-grid';
import { visuallyHidden } from '@mui/utils';
// import { fdate } from '@utils/FormatDate';

interface Data {
  id: string;
  company: string;
  amount: number;
  nmid: number;
  tax: string;
  date: string;
}

export default function CampaingsPage() {
  const [campaings, setCampaings] = useState<Data[]>([]);

  useEffect(() => {
    fetchMe();

    async function fetchMe() {
      const res = await fetch('http://localhost:5500/api/v2/compaigns', { method: 'GET' });
      const body = await res.json();
      setCampaings(body.data);
    }
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Артикул</TableCell>
              <TableCell>Компания</TableCell>
              <TableCell align="right">Стоимость</TableCell>
              <TableCell align="right">Налог</TableCell>
              <TableCell>Дата</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaings.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.nmid}
                </TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.tax}</TableCell>
                <TableCell>{moment(row.date, 'x').format('DD.MM.YYYY')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
