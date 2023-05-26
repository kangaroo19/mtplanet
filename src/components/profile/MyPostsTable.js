import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'title', label: '제목', minWidth: 100 },
 
];

function createData(id,title) {
  return { id,title };
}



export default function MyPostsTable({data}) {
  const navigate=useNavigate()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [allPostObj,setAllPostObj]=React.useState([])
  const [rows,setRows]=React.useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  React.useEffect(()=>{
    const tempRows=[]
    const tempAllRows=[]
    data.forEach((v)=>{
        tempRows.push(createData(v.id,v.title))
        tempAllRows.push(v)

    })
    setRows(tempRows)
    
    setAllPostObj(tempAllRows)

  },[data])
  const onClickMoveToPost=(row)=>{
    const sendPostObj=allPostObj.filter((value)=>value.id===row.id)
    navigate(`/post/${row.id}`,{state:{postObj:sendPostObj},})
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column,idx) => (
                <TableCell
                  key={idx}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,_idx) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={_idx}>
                    {columns.map((column,idx) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={idx} align={column.align} onClick={()=>onClickMoveToPost(row)}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
