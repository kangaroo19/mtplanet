//상단에 고정되는 네비게이션 바
import { Link } from "react-router-dom"
import styled from 'styled-components'

function Navigation({userObj,isLoggedIn}){
    return (
        <Wrapper>
            <Content>
                <div><Link to="/">홈</Link></div>
                <div><Link to="/ranking">랭킹</Link></div>
                <div><Link to="/news">뉴스</Link></div>
                {isLoggedIn?<div><Link to="/profile">내 프로필</Link></div>:
                <div><Link to="/login">로그인</Link></div>
                }
            </Content>
        </Wrapper>
    )
}

export default Navigation

const Wrapper=styled.div`
    height:5vh;
    background-color:pink;
`
const Content=styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:300px;
    height:inherit
`