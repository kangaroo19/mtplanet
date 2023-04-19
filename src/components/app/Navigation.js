//상단에 고정되는 네비게이션 바

//2023/04/20
//가독성 향상 위해 Link 컴포넌트 사용대신 
//Link태그 역할을 하는 LinkStyled컴포넌트 만듦
import { Link } from "react-router-dom"
import styled from 'styled-components'

const Navigation = ({ isLoggedIn }) => {
  return (
    <Wrapper>
      <HeadContainer>
        <LinkStyled to="/">홈</LinkStyled>
        <LinkStyled to="/ranking">랭킹</LinkStyled>
        <LinkStyled to="/news">뉴스</LinkStyled>
        <LinkStyled to={isLoggedIn ? "/profile" : "/login"}>
          {isLoggedIn ? "내 프로필" : "로그인"}
        </LinkStyled>
      </HeadContainer>
    </Wrapper>
  )
}

export default Navigation

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgb(245, 241, 241);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`

const HeadContainer = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  justify-content:space-around;
  align-items: center;
`

const LinkStyled = styled(Link)`
  font-weight: bold;
  font-size: 1.2rem;
  color: black;
  margin-left: 30px;
  text-decoration: none;
  &:hover {
    color: #2186c4;
    cursor: pointer;
  }
`