//홈 화면
//크게 세가지 컴포넌트로 구성
//TitleImg : 네비게이션 바 밑에 위치한 이미지
//BootCamp : 각각의 신교대 목록 그려줌
//Footer : 일반적인 footer
import { useEffect,useState } from "react";
import SearchInput from "../components/SearchInput";
import divisionData from "../data/divisionData"
import BootCamp from "../components/BootCamp";
import styled from "styled-components";
import Grid from '@mui/material/Grid';
import TitleImg from "../components/TitleImg";
function Home({userObj}){
    return (
        <div>
            <TitleImg/>
            <Wrapper>
                <SearchInput/>
                <Grid  container rowSpacing={0} columnSpacing={{ xs: 2, sm: 2, md: 2 }} style={{border:'1px solid black'}}>
                {divisionData.map((v,i)=>(
                    <BootCamp
                        key={v.id}
                        id={v.id}
                        title={v.title}
                    />
                ))}
                </Grid>
            </Wrapper>
        </div>
    )
}

export default Home
const Wrapper=styled.div`
width:100%;
height:100%;
margin:0 auto;
overflow: hidden;
@media only screen and (min-width:1200px){
    max-width:1200px;
}
`
