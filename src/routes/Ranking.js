//부대의 별점순 랭킹
//리뷰 없는 부대는 제외하는 기능 추가하기
//에러있음
//리뷰를 작성하면 해당부대의 컬렉션에는 제대로 등록이 되지만
//allarmy 컬렉션에는 잘 등록이 안됨
//보니까 홈페이지로 이동할때만 제대로 등록되고
//홈페이지가 아닌 랭킹페이지로 이동하면 등록이안됨
//onSnapshot 문제인거같음 (bootcamp컴포넌트의 useEffect문제)
import { useEffect,useState } from "react"
import { dbService } from "../fbase"
import { getDoc,collection,doc,query,onSnapshot,orderBy } from "firebase/firestore"
import divisionData from "../data/divisionData"
import styled from "styled-components"
import Rank from "../components/Rank"
import { Grid } from "@mui/material"
function Ranking(){
    const [armys,setArmys]=useState([])
    const [sort,setSort]=useState('desc')
    useEffect(()=>{
        let q
        if(sort==='desc'){ //평점 높은순
            q=query(collection(dbService,"allarmy"),orderBy("rating","desc"))
        }
        else if(sort==='asc'){ //평점 낮은순
            q=query(collection(dbService,"allarmy"),orderBy("rating","asc"))
        }
        else if(sort==='rdesc'){ //리뷰 많은순
            q=query(collection(dbService,"allarmy"),orderBy("count","desc"))
        }
        else{ //리뷰 적은순
            q=query(collection(dbService,"allarmy"),orderBy("count","asc"))
        }
        const un=onSnapshot(q,(snapshot)=>{ //데이터베이스에 변화가 생기면 onSnapshot 실행됨
            const arr=[]
            snapshot.forEach((doc)=>{
                arr.push({
                    id:doc.id, 
                    ...doc.data()
                })
            })
            setArmys(arr)
        })
    },[sort])
    
    const onSortChange=(event)=>{ //평점 오름차순,내림차순 정렬
        setSort(event.target.value)
    }
    return (
        <Wrapper>
            <Inner>
                <Select onChange={onSortChange}>
                    <Option value="desc">평점 높은순</Option>
                    <Option value="asc">평점 낮은순</Option>
                    <Option value="rdesc">리뷰 많은순</Option>
                    <Option value="rasc">리뷰 적은순</Option>
                </Select>
                <Grid container sx={{borderBottom:'1px solid #e4e4e4'}} pb={1}>
                    <Grid item xs={2}>순위</Grid>
                    <Grid item xs={6}>부대명</Grid>
                    <Grid item xs={2}>별점</Grid>
                    <Grid item xs={2}>리뷰 수</Grid>
                </Grid>
                {armys.map((v,i)=>(
                    <Rank
                        key={i}
                        id={i} 
                        armyObj={v}/>
                ))}
            </Inner>
        </Wrapper>
    )
}

export default Ranking

const Wrapper=styled.div`
    width:100%;
    height:100%;
    margin:0 auto;
    overflow: hidden;
    margin-top:70px;
    @media only screen and (min-width:1000px){
        max-width:1000px;
    }
`

const Inner=styled.div`
    text-align:center;
`

const Title=styled.div`
    border-bottom:1px solid #e4e4e4;
`

const Select=styled.select`
    float:right;
    margin-bottom:10px;
`

const Option=styled.option`
`