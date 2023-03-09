import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('흡연', <Checkbox></Checkbox>, 6.0, 24, 4.0),
  createData('TV', 237, 9.0, 37, 4.3),
  createData('PX', 262, 16.0, 24, 6.0),
];

export default function BasicTable({px,tv,smoke}) {
    const t=true
  return (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>가능</TableCell>
                    <TableCell>불가능</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>흡연</TableCell>
                    <TableCell><Checkbox disabled checked={smoke}/></TableCell>
                    <TableCell><Checkbox disabled checked={!smoke}/></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>TV</TableCell>
                    <TableCell><Checkbox disabled checked={tv}/></TableCell>
                    <TableCell><Checkbox disabled checked={!tv}/></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>PX</TableCell>
                    <TableCell><Checkbox disabled checked={px}/></TableCell>
                    <TableCell><Checkbox disabled checked={!px}/></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
  );
}