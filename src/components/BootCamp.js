//홈 화면에 그려지는 각각의 신교대 목록들
//신교대 클릭시 해당 부대 게시판(Detail.js)으로 이동
import { Link,useNavigate } from "react-router-dom"
import styled from 'styled-components'
import Grid from '@mui/material/Grid';
import divisionData from "../data/divisionData";
function BootCamp({id,title}){
    const navigate=useNavigate()
    const onClickNavigate=()=>{
        navigate(`/detail/${id}`)
    }
    return (
        <Grid item xs={4}>
            <Wrapper onClick={onClickNavigate}>
            <CardImg>
                <img src={divisionData[id].img} style={{width:'200px',height:'155px'}}></img>
            </CardImg>
            <CardText>
                <Title>{divisionData[id].name}</Title>
                <Desc>{divisionData[id].desc}</Desc>
            </CardText>
            </Wrapper>
        </Grid>
    )
}

export default BootCamp

const Wrapper=styled.div`
    max-width:240px;
    box-shadow: 10px 10px 10px -5px rgba(25,42,70,0.2);
    border-radius:8px;
    margin:0 10px;
    transition: 0.4s;
    flex-shrink: 0;
`
const CardImg=styled.div`
    width:222px;
    height:155px;
    border-radius:8px 8px 0 0;
`
const CardText=styled.div`
    width:100%;
    padding:0.5rem 0 1rem 0;
`

const Title=styled.div`
    font-weight: bold;
    color:inherit;
    width:100%;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  
`

const Desc=styled.div`
font-size: 0.9rem;
color:inherit;
line-height: 1.5rem;
`