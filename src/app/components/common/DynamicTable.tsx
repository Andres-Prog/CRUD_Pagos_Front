'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  TextField,
  TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DynamicTableProps } from '../../types';

export default function DynamicTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
}: DynamicTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  // Memorizo los datos filtrados para mejorar el rendimiento
  const filteredData = useMemo(() => {
    if (!filter) return data;
    return data.filter((item) =>
      // Busca el texto del filtro en cualquier valor de las propiedades del objeto
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [data, filter]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Filtrar..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Box>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={String(column.id)}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                {columns.map((column) => {
                  if (column.id === 'actions') {
                    return (
                      <TableCell key="actions" align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          {onEdit && (
                            <IconButton onClick={() => onEdit(item)} color="primary">
                              <EditIcon />
                            </IconButton>
                          )}
                          {onDelete && (
                            <IconButton onClick={() => onDelete(item)} color="error">
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>
                      </TableCell>
                    );
                  }
                  // Usa la función render si existe, si no, muestra el valor directamente
                  const value = column.render ? column.render(item) : (item[column.id as keyof T] as React.ReactNode);
                  return <TableCell key={String(column.id)}>{value}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}