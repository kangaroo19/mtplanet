import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DataTable from '../components/board/DataTable'


function Board({userObj}){
    const navigation=useNavigate()
    const onClickAddPost=()=>{ 
        if(!userObj)  return navigation('/login')
        navigation('/addpost')
    }
    return (
        <Wrapper>
            <Inner>
                <Title>자유게시판</Title>
                <button onClick={onClickAddPost}>글쓰기</button>
                <DataTable/>
            </Inner>
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