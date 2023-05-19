import { useLocation } from "react-router-dom"
import styled from "styled-components"
import ReplyForm from "./ReplyForm"

function Post({userObj}){
    const location=useLocation()
    const postObj=location.state.postObj[0]
    console.log(postObj)
    return (
        <Wrapper>
            <Inner>
            <HeadContainer>
                <Head>자유게시판</Head>
                <Title>{postObj.title}</Title>
                <WriterContaienr>
                    <Writer>작성자 : {postObj.userObj.displayName}</Writer>
                    <Date>작성일 : {postObj.date}</Date>
                </WriterContaienr>
            </HeadContainer>
            <ContentContainer>
                <Content>{postObj.content}</Content>
            </ContentContainer>
            <ReplyForm userObj={userObj}/>   
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


