//2023/04/19

//미디어 쿼리 위한 innerWidth 반환하는 함수(원래는 NewsDetail컴포넌트에 있엇음)를
//따로 분리해서 커스텀 훅으로 만들고 innerWidth 값을 NewsDetail 컴포넌트에 프롭으로 내려줌


import { useEffect, useState,useCallback } from "react";
import styled from "styled-components"
import NewsDetail from "../components/news/NewsDetail";
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from "@mui/material";
import useWindowWidth from "../functions/useWindowWidth"

function News(){
    const [news,setNews]=useState([])
    const [loading,setLoading]=useState(true)
    const innerWidth=useWindowWidth()
    
    useEffect(()=>{
        const getNews=async () => {
            const response = await fetch(`https://gnews.io/api/v4/search?q=korea army&apikey=${process.env.REACT_APP_NEWS_ID}`)
            const json = await response.json() //.json()은 프로미스 반환하므로 await 키워드 필요
            setNews(json.articles)
            setLoading(false)
        }
        getNews()
    },[])
    
    return (
        <Wrapper>
            <Inner>
                {(loading)?
                <Grid display='flex' justifyContent='center' minHeight='100vh' alignItems='center'>
                <CircularProgress/>
                </Grid>:
                
                <>
                <Title>국방</Title>
                {news.map((v,i)=>(
                    <NewsDetail 
                        key={i} 
                        newsObj={v}
                        innerWidth={innerWidth}/>
                ))}
                </>
                } 

            </Inner>
        </Wrapper>
    )
}

export default News
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
    font-weight:900;
    font-size:1.5rem;
    margin-bottom:10px;
`
