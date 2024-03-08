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
  nmid: number;
  brand: string;
  color: string;
  title: string;
  vendorCode: string;
  category: string;
  createdAt: string;
  deletedAt: null | string;
  supplier: string;
  type: string;
}

export default function NomenclaturePage() {
  const [nomenclature, setNomenclature] = useState<Data[]>([]);

  useEffect(() => {
    fetchMe();

    async function fetchMe() {
      const res = await fetch('http://localhost:5500/api/v2/nm/list', { method: 'GET' });
      const body = await res.json();
      setNomenclature(body.data);
    }
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>МП ID</TableCell>
              <TableCell>Продавец</TableCell>
              <TableCell>Производитель</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Цвет</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell>Бренд</TableCell>
              <TableCell>Компания</TableCell>
              <TableCell>Дата создания</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nomenclature.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.nmid}
                </TableCell>
                <TableCell>{row.vendorCode}</TableCell>
                <TableCell>1С Data</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.color}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.brand}</TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell>{moment(row.createdAt).format('DD.MM.YYYY')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
