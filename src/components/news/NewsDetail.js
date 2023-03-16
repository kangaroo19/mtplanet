import { useEffect,useState } from "react"
import { Grid } from "@mui/material"
import styled from "styled-components"
import { Link } from "react-router-dom"
function NewsDetail({newsObj}){
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    useEffect(()=>{
        const resizeListener = () => { //현재 화면 크기값
            setInnerWidth(window.innerWidth);
          };
          window.addEventListener("resize", resizeListener);
    })
    return (
        <Wrapper>
            <Grid container>
                <Grid item xs={3}>
                    <Image src={newsObj.image}></Image>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                    {innerWidth>=420?
                    <><Link to={newsObj.url} style={{textDecoration:'none',}}><Title>{newsObj.title}</Title></Link></>:
                    <><Link to={newsObj.url} style={{textDecoration:'none',}}><Title>{newsObj.title.length>=28?(newsObj.title).substring(0,28)+'...':newsObj.title}</Title></Link></>}
                    <Desc>{newsObj.content}</Desc>
                    <Publisher>{newsObj.rights}</Publisher>
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
    @media only screen and (max-width:420px){
        height:100px;
    }
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
    @media only screen and (max-width:420px){
        display:none;
    }
`

const Publisher=styled.div`
    color:#949393;
`