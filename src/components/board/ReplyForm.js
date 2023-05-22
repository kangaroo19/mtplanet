import Avatar from '@mui/material/Avatar';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import Error from '../login/Error';
import { doc, setDoc,addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { dbService } from '../../fbase';


function ReplyForm({userObj,postObj}){
    const [error,setError]=useState(false)
    const [name,setName]=useState('로그인')
    const [img,setImg]=useState(null)
    const [toggle,setToggle]=useState(false) //작성한 날짜와 날짜별 정렬위함
    const [replyObj,setReplyObj]=useState({
                                            id:(Math.random()*1000000).toFixed().toString(),
                                            value:"",   //작성한 댓글
                                            date:null,  //작성한 시간
                                            sort:null,  //시간별 정렬위함
                                            userObj:userObj
                                        })
    
    useEffect(()=>{
        if(userObj){
            setName(userObj.displayName)
            setImg(userObj.userImg)
        }
    },[])                               
    useEffect(()=>{
        const date=getDateString()
        setReplyObj({...replyObj, date: date[0],sort:date[1]})
    }, [toggle])
    const onChangeReplyValue=(event)=>{
        const {target:{value}}=event
        setReplyObj({...replyObj,value:value})
    }
    const onClickSendBtn=async()=>{
        if(!userObj) return setError(true)  //로그인상태 아닐시 에러창 표시
        if(replyObj.value==="") return alert("댓글을 입력해 주세요")
        setToggle((prev)=>!prev)
        console.log(replyObj)
        await addDoc(collection(dbService,postObj.id),replyObj)
        return window.location.reload()
    }
    function callBack(value) { //자식 컴포넌트의 데이터 부모 컴포넌트(app)로 보내기 위함
        setError(value)
    }

    const getDateString=()=>{ //현재 시간 가져오는 함수
        const today = new Date();
        const unixTime=today.getTime() //정렬에 사용할 유닉스시간값
        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);
        const hour=('0' + today.getHours()).slice(-2);
        const min=('0' + today.getMinutes()).slice(-2);
        const sec=('0' + today.getSeconds()).slice(-2);
        return [year + '-' + month  + '-' + day+" " + hour + ":"+ min + ":" + sec , unixTime ];
    }
    return (
        <Wrapper>
           <Inner>
                <UserContainer style={{padding:'0 5px 0 5px'}}>
                    <Avatar alt="Remy Sharp" src={img} sx={{ width: 60, height: 60, diplay:'block', margin:'0 auto' }}/>
                    <UserName>{name}</UserName>
                </UserContainer>
                <TextField
                    onChange={onChangeReplyValue} 
                    id="filled-basic" 
                    label="댓글을 입력하세요" 
                    variant="filled" 
                    multiline
                    rows={2} //height
                    sx={{
                        width:'75%',
                        padding:'0 5px 0 5px',
                        }} />
                <Button variant="contained" onClick={onClickSendBtn}>댓글쓰기</Button>
           </Inner>
           {error
                ? <Error error='댓글을 작성하려면 로그인이 필요합니다.' callBack={callBack}/>
                : null
            }
        </Wrapper>
    )
}

export default ReplyForm

const Wrapper=styled.div`
    padding:10px 0 10px 0;
    border-bottom:3px solid #eee;
`

const Inner=styled.div`
    display:flex;
    justify-content:space-between;
`

const UserContainer=styled.div`
    
`


const UserName=styled.div`
    text-align:center;
`

