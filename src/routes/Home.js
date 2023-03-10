// 홈 화면 크게 세가지 컴포넌트로 구성 
//TitleImg : 네비게이션 바 밑에 위치한 이미지 
//BootCamp : 각각의 신교대 목록 그려줌
// Footer : 일반적인 footer
import SearchInput from "../components/home/SearchInput";
import divisionData from "../data/divisionData"
import BootCamp from "../components/home/BootCamp";
import styled from "styled-components";
import Grid from '@mui/material/Grid';
import TitleImg from "../components/home/TitleImg";
import { useEffect } from "react";
function Home({userObj}) {
    useEffect(()=>{
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code"); //인가코드
        
        let grant_type = "authorization_code";
        let client_id = process.env.REACT_APP_KAKAO_KEY
        console.log(code);
    })
    // https://velog.io/@sgsg9447/oAuth-Kakao-Login
    return (
        <div>
            <TitleImg/>
            <Wrapper>
                <SearchInput/>
                <Grid
                    container
                    rowSpacing={0}
                    columnSpacing={{
                        xs: 2,
                        sm: 2,
                        md: 2
                    }}>
                    {
                        divisionData.map((v, i) => (
                            <BootCamp key={v.id} id={v.id} title={v.title}/>
                        ))
                    }
                </Grid>
            </Wrapper>
        </div>
    )
}

export default Home
const Wrapper = styled.div `
    width:100%;
    height:100%;
    margin:0 auto;
    overflow: hidden;
    @media only screen and (min-width:1000px){
        max-width:1000px;
    }
`
