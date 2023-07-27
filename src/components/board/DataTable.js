import { useEffect,useState } from 'react';
import styled from "styled-components";
import { collection, getCountFromServer, onSnapshot, orderBy, query ,getDocs} from 'firebase/firestore';
import { dbService } from '../../fbase';
import { useNavigate } from 'react-router-dom';
import  Pagination  from './Pagination';


function DataTable(){
    const navigate=useNavigate()
    const [rows,setRows]=useState([]) //db에 들어가있는 데이터
    const [limit,setLimit]=useState(10) //한 페이지당 최대로 볼 수 있는 게시물의 갯수
    const [page,setPage]=useState(1)
    const offset=(page-1)*limit //현재 페이지의 처음 인덱스
    
    const [allPostObj,setAllPostObj]=useState([])
    // const getRepliesLength=async(id)=>{  //댓글갯수 가져오는 함수
    //   const countRef=collection(dbService,`${id}`)
    //   return await getCountFromServer(countRef)
    // }
    
    
  useEffect(() => {
    const getPosts = async () => {
      const querySnapshot = query(collection(dbService, 'post'), orderBy("sort", "desc"));
  
      const tempRows = [];
      const tempAllRows = [];
      
      try {
        const snapshot = await getDocs(querySnapshot);
        for (const doc of snapshot.docs) { //밑의 1번 주석 참고
          const countRef = collection(dbService, `${doc.data().id}`);
          const replyLength = await getCountFromServer(countRef);
          tempRows.push({...doc.data(),count:replyLength.data().count});
        }
        
        setRows(tempRows);
        setAllPostObj(tempAllRows);
      } catch (error) {
        console.error(error);
      }
    }
  
    getPosts();
  }, []);
  return (
    <>
      <label style={{float:'right',lineHeight:'50px'}}>
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
                <RepliesLength>댓글 수 : {value.count}</RepliesLength>
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
  @media only screen and (max-width:420px){
    font-size:1rem;
    
  }
`

const Content=styled.div`
  display:flex;
  color:gray;
`

const WriterName=styled.div`
  margin-right:10px;
  width:130px;
  @media only screen and (max-width:420px){
    font-size:0.8rem;
    width:90px;
  }
`

const Date=styled.div`
  width:250px;
  margin-right:10px;
  @media only screen and (max-width:420px){
    font-size:0.8rem;
    width:300px;
  }

`
const RepliesLength=styled.div`
  @media only screen and (max-width:420px){
    font-size:0.8rem;
    width:110px;
  }
`
//1:
//forEach문은 비동기 동작 기다려주지 않음
//tempRows.push(doc.data()) 코드는 
//getCountFromServer(비동기함수) 함수의 결과를 기다리지 않고 실행됩니다. 
//따라서 tempRows에 올바른 데이터가 담기지 않을 수 있습니다. 
//결과적으로 forEach가 아닌 for...of나 for문 사용
//forEach문 안에 비동기함수가 있으면 뭔가 뒤죽박죽된 느낌