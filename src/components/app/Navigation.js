//상단에 고정되는 네비게이션 바
import { Link } from "react-router-dom"
import styled from 'styled-components'

function Navigation({userObj,isLoggedIn}){
    return (
        <Wrapper>
            <Inner>
                <HeadContainer>
                    <Link to="/" style={{ textDecoration: 'none', }}><Content>홈</Content></Link>
                    <Link to="/ranking" style={{ textDecoration: 'none', }}><Content>랭킹</Content></Link>
                    <Link to="/news" style={{ textDecoration: 'none', }}><Content>뉴스</Content></Link>
                    {isLoggedIn?
                    <Link to="/profile" style={{ textDecoration: 'none', }}><Content>내 프로필</Content></Link>:
                    <Link to="/login" style={{ textDecoration: 'none', }}><Content>로그인</Content></Link>
                    }
                </HeadContainer>
            </Inner>
        </Wrapper>
    )
}

export default Navigation

const Wrapper=styled.div`
    width:100%;
    height:50px;
    background-color: rgb(245, 241, 241);
    position: fixed;
    top:0;
    left:0;
    z-index: 1000;
`
const Inner=styled.div`
    width:100%;
    height:100%;
    margin:0 auto;
    overflow: hidden;
`
const HeadContainer=styled.div`
    width:400px;
    height:100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
`

const Content=styled.div`
    font-weight: bold;
    font-size: 1.2rem;
    color:black;
    margin-left:30px;
    &:hover{
        color:#2186c4;
        cursor:pointer;
    }
`