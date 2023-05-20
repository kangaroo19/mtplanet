import Avatar from '@mui/material/Avatar';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

function ReplyForm({userObj}){
    const [name,setName]=useState('로그인')
    const [img,setImg]=useState(null)
    useEffect(()=>{
        if(userObj){
            setName(userObj.displayName)
            setImg(userObj.userImg)
        }
    },[])
    return (
        <Wrapper>
           <Inner>
                <UserContainer style={{padding:'0 5px 0 5px'}}>
                    <Avatar alt="Remy Sharp" src={img} sx={{ width: 60, height: 60, diplay:'block', margin:'0 auto' }}/>
                    <UserName>{name}</UserName>
                </UserContainer>
                <TextField 
                    id="filled-basic" 
                    label="댓글을 입력하세요" 
                    variant="filled" 
                    multiline
                    rows={2} //height
                    sx={{
                        width:'75%',
                        padding:'0 5px 0 5px',
                        }} />
                <Button variant="contained" >댓글쓰기</Button>
           </Inner>
           
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

