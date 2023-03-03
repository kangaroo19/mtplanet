//랭킹 페이지에서 각 랭킹 표현

import styled from "styled-components"
import { Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
function Rank({id,armyObj}){
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
                        <Image src={armyObj.img} alt="" />{armyObj.title}
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
`

const Image=styled.img`
    width:20px;
    height:20px;
`