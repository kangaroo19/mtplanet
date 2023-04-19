//랭킹 페이지에서 각각의 랭킹 표현

import styled from "styled-components"
import { Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
function Rank({id,armyObj,innerWidth}){
    const navigate=useNavigate()
    const onClick=()=>{
        navigate(`/detail/${armyObj.routing}`)
    }
    return (
        <Wrapper>
            <Grid container>
                <Grid item xs={2}>{id+1}</Grid>
                <Grid item xs={6}>
                    <Inner onClick={onClick}>
                        {innerWidth>=420?
                        <><Image src={armyObj.img}/>{armyObj.title}</>:
                        <><Image src={armyObj.img}/>{armyObj.title.length>=11?(<>{(armyObj.title).substring(0,9)+'...'}</>):<>{armyObj.title}</>}</>}
                    </Inner>
                </Grid>
                <Grid item xs={2}>{armyObj.rating}</Grid>
                <Grid item xs={2}>{armyObj.count}</Grid>
            </Grid>
        </Wrapper>
    )
}

export default Rank

const Wrapper=styled.div`
    height:50px;
    line-height:50px;
    border-bottom:#e4e4e4 solid 1px
`

const Inner=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    @media only screen and (max-width:420px){
        font-size:0.8rem;
    }
`

const Image=styled.img`
    width:20px;
    height:20px;
`