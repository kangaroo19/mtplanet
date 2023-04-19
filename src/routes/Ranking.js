//부대의 별점순 랭킹
//리뷰 없는 부대는 제외하는 기능 추가하기
//에러있음
//리뷰를 작성하면 해당부대의 컬렉션에는 제대로 등록이 되지만
//allarmy 컬렉션에는 잘 등록이 안됨
//보니까 홈페이지로 이동할때만 제대로 등록되고
//홈페이지가 아닌 랭킹페이지로 이동하면 등록이안됨
//onSnapshot 문제인거같음 (bootcamp컴포넌트의 useEffect문제)


//2023/04/19

//미디어 쿼리 위한 innerWidth 반환하는 함수(원래는 rank컴포넌트에 있엇음)를
//따로 분리해서 커스텀 훅으로 만들고 innerWidth 값을 rank컴포넌트에 프롭으로 내려줌

import { useEffect,useState } from "react"
import { dbService } from "../fbase"
import { collection,query,onSnapshot,orderBy,where } from "firebase/firestore"
import styled from "styled-components"
import Rank from "../components/ranking/Rank"
import { Grid } from "@mui/material"
import useWindowWidth from "../functions/useWindowWidth"
function Ranking(){
    const [armys,setArmys]=useState([])
    const [sort,setSort]=useState('desc')
    const innerWidth=useWindowWidth()
    useEffect(()=>{ 
        let q
        switch(sort){
            case 'desc' : //평점 높은순
                q=query(collection(dbService,"allarmy"),orderBy("rating","desc"))
                break
            case 'asc' : //평점 낮은순
                q=query(collection(dbService,"allarmy"),where('rating','!=',0),orderBy("rating","asc"))
                break
            case 'rdesc' : //리뷰 많은순
                q=query(collection(dbService,"allarmy"),orderBy("count","desc"))
                break
            case 'rasc' : //리뷰 적은순
                q=query(collection(dbService,"allarmy"),where('count','!=',0),orderBy("count","asc"))
                break
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
    
    const onChangeSort=(event)=>{ //평점 오름차순,내림차순 정렬
        setSort(event.target.value)
    }
    return (
        <Wrapper>
            <Inner>
                {/* <input type="checkbox" name="color" value="blue"/> Blue */}
                <Select onChange={onChangeSort}>
                    <Option value="desc">평점 높은순</Option>
                    <Option value="asc">평점 낮은순</Option>
                    <Option value="rdesc">리뷰 많은순</Option>
                    <Option value="rasc">리뷰 적은순</Option>
                </Select>
                <Grid container sx={{borderBottom:'1px solid #e4e4e4'}} pb={1}>
                    <Grid item xs={2} fontWeight='900'>순위</Grid>
                    <Grid item xs={6} fontWeight='900'>부대명</Grid>
                    <Grid item xs={2} fontWeight='900'>별점</Grid>
                    <Grid item xs={2} fontWeight='900'>리뷰 수</Grid>
                </Grid>
                {armys.map((v,i)=>(
                    <Rank
                        key={i}
                        id={i} 
                        armyObj={v}
                        innerWidth={innerWidth}/>
                ))}
            </Inner>
        </Wrapper>
    )
}

export default Ranking

const Wrapper=styled.div`
    background-color:#e9e9e9;
    margin-top:50px;
    @media only screen and (max-width:420px){
        margin-bottom:50px;
    }
`

const Inner=styled.div`
    text-align:center;
    background-color:white;
    width:100%;
    height:100%;
    margin:0 auto;
    overflow: hidden;
    padding:20px;
    @media only screen and (min-width:900px){
        max-width:900px;
    }
`

const Select=styled.select`
    float:right;
    margin-bottom:10px;
`

const Option=styled.option`
`