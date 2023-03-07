import { Grid } from "@mui/material"
import styled from "styled-components"
import { Link } from "react-router-dom"
function NewsDetail({newsObj}){
    console.log(newsObj)
    return (
        <Wrapper>
            <Grid container>
                <Grid xs={3}>
                    <Image src={newsObj.urlToImage}></Image>
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={8}>
                    <Link to={newsObj.url} style={{textDecoration:'none',}}><Title>{newsObj.title}</Title></Link>
                    <Desc>{newsObj.description}</Desc>
                </Grid>
            </Grid>
        </Wrapper>
    )
}

export default NewsDetail

const Wrapper=styled.div`
    border-bottom:1px solid #e4e4e4;
    width:100%;
    margin-bottom:10px;
`
const Inner=styled.div`
    display:flex;
`
const Image=styled.img`
    width:100%;
    height:150px;
    
`

const Title=styled.div`
    color:black;
    font-size:1.2rem;
    font-weight:700;
    margin-bottom:20px;
    &:hover{
        transition:all 0.5s;
        color:#2186c4;
        cursor:pointer;
    }
`

const Desc=styled.div`
    font-size:1rem;

`