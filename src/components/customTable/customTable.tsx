import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Product } from '@/service/products/products.interface';

import Icon from '@mui/material/Icon';


export default function customTable(products: Product[], update: (product: Product) => void, delet: (id: string) => Promise<void>) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Descripcíon</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">
                <Icon onClick={() => update(row)} sx={{ fontSize: 30 }}>edit</Icon>
                <Icon onClick={() => delet(row.id)} sx={{ fontSize: 30 }}>delete</Icon>
              </TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}