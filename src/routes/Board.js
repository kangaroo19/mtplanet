import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DataTable from '../components/board/DataTable'
import { useState } from 'react'
import Error from '../components/login/Error'
import Button from '@mui/material/Button';

function Board({userObj}){
    const [error,setError]=useState(false)
    const navigation=useNavigate()
    const onClickAddPost=()=>{ 
        if(!userObj)  return setError(true)
        navigation('/postform')
    }
    function callBack(value) { //자식 컴포넌트의 데이터 부모 컴포넌트(app)로 보내기 위함
        setError(value)
    }
    return (
        <Wrapper>
            <Inner>
                <Title>자유게시판</Title>
                <Button variant="outlined" onClick={onClickAddPost}>글쓰기</Button>
                <DataTable/>    
            </Inner>
            {error
                ? <Error error='게시물을 작성하려면 로그인이 필요합니다.' callBack={callBack}/>
                : null
            }
        </Wrapper>
    )  
}

export default Board

const Wrapper=styled.div`
    margin-top:50px;
    background-color:#e9e9e9;
    @media only screen and (max-width:420px){
        margin-top:20px;
        margin-bottom:60px;
    }
`

const Inner = styled.div `
    background-color:white;
    width:100%;
    height:100%;
    margin:0 auto;
    padding:20px;
    overflow: hidden;
    @media only screen and (min-width:800px){
        max-width:800px;
    }
`

const Title=styled.div`
    font-size:2rem;
    text-align:center;
    padding:10px;
    padding-top:50px;
`