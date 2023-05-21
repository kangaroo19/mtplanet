import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import ReplyForm from "./ReplyForm"
import { useEffect,useState } from "react"
import { authService, dbService } from "../../fbase";
import { Grid } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import Replies from "./Replies";


function Post({userObj}){
    const location=useLocation()
    const navigate=useNavigate()
    const postObj=location.state.postObj[0]
    const [toggle,setToggle]=useState(false) // 현재 로그인한 사용자와 게시판 글쓴 사람과 같은지 비교위함
    useEffect(()=>{
        if(!userObj) return //로그인상태 아닐시
        if(authService.currentUser.uid===postObj.userObj.uid){
            setToggle(true)
        }
    },[])

    const onClickUpdateBtn=()=>{
        if(window.confirm('게시물을 수정하시겠습니까?')){   //확인버튼 클릭시
            return navigate('/postform',{state:{postObj:postObj},})
        }
    }

    const onClickDeleteBtn=async()=>{
        if(window.confirm('게시물을 삭제하시겠습니까?')){   //확인버튼 클릭시
            await deleteDoc(doc(dbService,"post",postObj.id))
            return navigate('/board')
        }
    }
    return (
        <Wrapper>
            <Inner>
            <HeadContainer>
                <Head>자유게시판</Head>
                <Title>{postObj.title}</Title>
                <WriterContaienr>
                    <Grid sx={{display:'flex'}}>
                        <Writer>작성자 : {postObj.userObj.displayName}</Writer>
                        <Date>작성일 : {postObj.date}</Date>
                    </Grid>
                    {toggle?
                    <Grid sx={{display:'flex'}}>
                        <UpdateBtn onClick={onClickUpdateBtn}>수정/</UpdateBtn>
                        <DeleteBtn onClick={onClickDeleteBtn}>삭제</DeleteBtn>
                    </Grid>:
                    null}
                </WriterContaienr>
            </HeadContainer>
            <ContentContainer>
                <Content>{postObj.content}</Content>
            </ContentContainer>
            <ReplyForm userObj={userObj}/>  
            <Replies/> 
            </Inner>
        </Wrapper>
    )
}

export default Post

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

const HeadContainer=styled.div`
    border-bottom:2px solid #eee;
    padding-bottom:10px;
`

const Head=styled.div`
    font-size:2rem;
    padding-bottom:10px;
    padding-top:50px;
    border-bottom:3px solid black;
`

const Title=styled.div`
    font-size:1.5rem;
    padding:10px 0 10px 0;
    font-weight:900;

`

const WriterContaienr=styled.div`
    display:flex;
    justify-content:space-between;
    
`
const Writer=styled.div`
    margin-right:10px;
`

const Date=styled.div`

`
const ContentContainer=styled.div`
    padding-bottom:10px;
    border-bottom:3px solid black;

`

const Content=styled.div`
    padding:10px 0 10px 0;
`

const UpdateBtn=styled.div`

`

const DeleteBtn=styled.div`
`

