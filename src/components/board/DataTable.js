import { useEffect,useState } from 'react';
import styled from "styled-components";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { collection, getCountFromServer, onSnapshot, orderBy, query } from 'firebase/firestore';
import { dbService } from '../../fbase';
import { useNavigate } from 'react-router-dom';
import  Pagination  from './Pagination';

// export default function StickyHeadTable() {
  
//   const columns = [
//     { id: 'id', label: 'ID', minWidth: 170 },
//     { id: 'title', label: '제목', minWidth: 300 },
//     { id: 'user', label: '작성자', minWidth: 100 },
//     { id: 'date', label: '등록일', minWidth: 100 },
//   ];
  
//   function createData(id, title, user, date) {
//     return { id, title, user, date };
//   }
  
  
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [rows,setRows]=React.useState([])
//   const [allPostObj,setAllPostObj]=React.useState([])
//   const navigate=useNavigate()
//   React.useEffect(()=>{
//     const getPosts=async()=>{
//       const querySnapshot = query(collection(dbService,'post'),orderBy("sort","desc"));
      
//       onSnapshot(querySnapshot,(snapshot)=>{  //onSnapshot은 비동기 함수이므로 이 함수 바깥에 setRows함수를 넣으면 바로 반영 안됨
//           const tempRows = [];
//           const tempAllRows=[]
//           snapshot.forEach((doc)=>{
//               tempRows.push(createData(doc.data().id,doc.data().title,doc.data().userObj.displayName,doc.data().date))
//               tempAllRows.push(doc.data())
//           })
//           setRows(tempRows);
//           setAllPostObj(tempAllRows)
//       })
//     }
//     getPosts();
//   },[]);
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   const onClickMoveToPost=(row)=>{
//     const sendPostObj=allPostObj.filter((value)=>value.id===row.id)
//     navigate(`/post/${row.id}`,{state:{postObj:sendPostObj},}) //내가 클릭한 게시물의 id와 db에 저장된 게시물의 id값이 맞는 게시물(무조건 하나는 있음) 데이터 보냄 
//   }
//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column,idx) => (
//                 <TableCell
//                   key={idx}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row,_idx) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={_idx}>
//                     {columns.map((column,idx) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={idx} align={column.align} onClick={()=>onClickMoveToPost(row)}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
                        
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5,10, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }

function DataTable(){
    const navigate=useNavigate()
    const [rows,setRows]=useState([]) //db에 들어가있는 데이터
    const [limit,setLimit]=useState(10) //한 페이지당 최대로 볼 수 있는 게시물의 갯수
    const [page,setPage]=useState(1)
    const offset=(page-1)*limit //현재 페이지의 처음 인덱스
    
    const [allPostObj,setAllPostObj]=useState([])
    const getRepliesLength=async(id)=>{  //댓글갯수 가져오는 함수
      const countRef=collection(dbService,`${id}`)
      return await getCountFromServer(countRef)
    }
    
    useEffect(()=>{
    const getPosts=async()=>{
      const querySnapshot = query(collection(dbService,'post'),orderBy("sort","desc"));
      
      onSnapshot(querySnapshot,(snapshot)=>{  //onSnapshot은 비동기 함수이므로 이 함수 바깥에 setRows함수를 넣으면 바로 반영 안됨
          const tempRows = [];
          const tempAllRows=[]
          snapshot.forEach(async(doc)=>{
              // const countRef=collection(dbService,`${doc.data().id}`)
              // const count=await getCountFromServer(countRef)

              // tempRows.push(createData(doc.data().id,doc.data().title,doc.data().userObj.displayName,doc.data().date))
              tempRows.push(doc.data())
              // tempAllRows.push(doc.data())
          })
          setRows(tempRows);
          setAllPostObj(tempAllRows)
      })
    }
    getPosts();
  },[]);
  console.log(rows)
  return (
    <>
      <label>
        게시물 수:&nbsp;
        <select 
          type="number" 
          value={limit} 
          onChange={({ target: { value } }) => setLimit(Number(value))}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
      <div>
        {rows.slice(offset,offset+limit).map((value)=>(
          
          <Contanier key={value.id} onClick={()=>navigate(`/post/${value.id}`,{state:{postObj:rows.filter((v)=>v.id===value.id)},})}>
            <Title>{value.title}</Title>
            
            <Content>
                <WriterName>{value.userObj.displayName}</WriterName>
                <Date>작성일 : {value.date}</Date>
            </Content>
          </Contanier>
        ))}
        <Pagination 
            
              length={rows.length}
              limit={limit}
              page={page}
              setPage={setPage}
              />
      </div>
    </>
  )
}

export default DataTable



//https://www.daleseo.com/react-pagination/

const Contanier=styled.div`
  padding:10px;
  border-bottom:#eee solid 2px;
`

const Title=styled.div`
  font-size:1.2rem;
  font-weight:900;
`

const Content=styled.div`
  display:flex;
  color:gray;
`

const WriterName=styled.div`
  margin-right:10px;
  width:130px;
`

const Date=styled.div`
`