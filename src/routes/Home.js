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
function Home({innerWidth}) {
    
    return (
        <div style={{backgroundColor:'#e9e9e9',}}>
            <TitleImg/>
            <Wrapper>
                <SearchInput innerWidth={innerWidth}/>
                <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={{
                        xs: 2,
                        sm: 2,
                        md: 2
                    }}>
                    {
                        divisionData.map((v, _) => (
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
    background-color:white;
    padding:20px;
    width:100%;
    height:100%;
    margin:0 auto;
    overflow: hidden;
    @media only screen and (min-width:800px){
        max-width:800px;
    }
    @media only screen and (max-width:420px){
        padding:5px;
        margin-bottom:70px;
    }
`
