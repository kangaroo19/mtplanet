import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { dbService } from '../../fbase';
import { useNavigate } from 'react-router-dom';




export default function StickyHeadTable() {
  
  const columns = [
    { id: 'id', label: 'ID', minWidth: 170 },
    { id: 'title', label: '제목', minWidth: 300 },
    { id: 'user', label: '작성자', minWidth: 100 },
    { id: 'date', label: '등록일', minWidth: 100 },
  ];
  
  function createData(id, title, user, date) {
    return { id, title, user, date };
  }
  
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows,setRows]=React.useState([])
  const [allPostObj,setAllPostObj]=React.useState([])
  const navigate=useNavigate()
  React.useEffect(()=>{
    const getPosts=async()=>{
      const querySnapshot = query(collection(dbService,'post'),orderBy("sort","desc"));
      
      onSnapshot(querySnapshot,(snapshot)=>{  //onSnapshot은 비동기 함수이므로 이 함수 바깥에 setRows함수를 넣으면 바로 반영 안됨
          const tempRows = [];
          const tempAllRows=[]
          snapshot.forEach((doc)=>{
              // console.log(123) 나중에 리랜더링 확인
              tempRows.push(createData(doc.data().id,doc.data().title,doc.data().userObj.displayName,doc.data().date))
              tempAllRows.push(doc.data())
          })
          setRows(tempRows);
          setAllPostObj(tempAllRows)
      })
    }
    getPosts();
  },[]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const onClickMoveToPost=(row)=>{
    const sendPostObj=allPostObj.filter((value)=>value.id===row.id)
    navigate(`/post/${row.id}`,{state:{postObj:sendPostObj},})
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
        rowsPerPageOptions={[5,10, 100]}
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