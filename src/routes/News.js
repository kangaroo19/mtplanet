import { useEffect, useState,useMemo,useCallback } from "react";
import styled from "styled-components"
import NewsDetail from "../components/news/NewsDetail";
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from "@mui/material";

function News(){
    const [news,setNews]=useState([])
    const [loading,setLoading]=useState(true)
    
    const getNews=useCallback(async ()=>{
        const json=await(
            await fetch(`https://gnews.io/api/v4/search?q=korea army&apikey=${process.env.REACT_APP_NEWS_ID}`)
        ).json()
        setNews(json.articles)
        setLoading(false)
    },[])
    
    useEffect(()=>{
        getNews()
    },[getNews])
    
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
                        newsObj={v}/>
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
