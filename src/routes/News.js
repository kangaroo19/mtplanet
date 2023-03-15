import { useEffect, useState } from "react";
import styled from "styled-components"
import NewsDetail from "../components/news/NewsDetail";
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from "@mui/material";
import axios from "axios";
import { display } from "@mui/system";
//e148feed44c547518a6d46d96af92278
function News(){
    const [news,setNews]=useState([])
    const [loading,setLoading]=useState(true)
    const NEWS_API_KEY=process.env.REACT_APP_NEWS_ID //env에 저장된 news api 키
    const topic='국방'
    // let url =`https://newsapi.org/v2/everything?q=${topic}&apiKey=${NEWS_API_KEY}`;
    const q='korea army'
    const lang='en'
    const sortBy='relevancy'
    const page='1'
    const pageSize='10'
    let url=`https://api.newscatcherapi.com/v2/search?q=${q}&lang=${lang}&sort_by=${sortBy}&page=${page}&page_size=${pageSize}`
    const options={
        method:'GET',
        headers: {
                    'x-api-key': 'CD91Izea5fqPFfWPLplh-_Eep0ifrsanmCbXyObZsjY'
                }
    }
    const getNews=async ()=>{
        const json=await(
            await fetch(url,options)
        ).json()
        console.log(json)
        setNews(json.articles)
        setLoading(false)
    }
    useEffect(()=>{
        getNews() //뉴스 가져옴
    },[])

    // let options = {
    //     method: 'GET',
    //     url: 'https://api.newscatcherapi.com/v2/search',
    //     params: {q: 'Korea army', lang: 'en', sort_by: 'relevancy', page: '1'},
    //     headers: {
    //         'x-api-key': 'CD91Izea5fqPFfWPLplh-_Eep0ifrsanmCbXyObZsjY'
    //     }
    //     };
    
    //     axios.request(options).then(function (response) {
    //         console.log(response.data);
    //     }).catch(function (error) {
    //         console.error(error);
    //     });

    

    
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
{/* <Title>국방</Title> */}
