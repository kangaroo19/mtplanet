//홈 화면에 그려지는 각각의 신교대 목록들
//신교대 클릭시 해당 부대 게시판(Detail.js)으로 이동
import { Link,useNavigate } from "react-router-dom"
import styled from 'styled-components'
import Grid from '@mui/material/Grid';
import divisionData from "../data/divisionData";
import { collection, doc, getCountFromServer, getDoc, setDoc } from "firebase/firestore";
import { dbService } from "../fbase";
import { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
function BootCamp({id,title}){
    const [star,setStar]=useState(0)
    const navigate=useNavigate()
    const onClick=async()=>{
        console.log(123232323)
        navigate(`/detail/${id}`)
        const initDocRef=collection(dbService,`${divisionData[id].title}`)
        const initSnapshot=await getCountFromServer(initDocRef)
        if(initSnapshot.data().count===0){ //만약 아무도 리뷰 작성하지 않앗을때 allrating필드 초기화 위함
            await setDoc(doc(dbService,`${divisionData[id].title}`,'allrating'),{star:0,count:0})
        }
    }
    // const getStarRating=async()=>{
    //     const starDocRef=doc(dbService,`${divisionData[id].title}`,'allrating')
    //     const starSnapshot=await getDoc(starDocRef)
    //     console.log(starSnapshot.data())
    //     return starSnapshot.data()
    // }
    
    // getStarRating()
    const setStarRating=async()=>{
        const starRef=doc(dbService,`${divisionData[id].title}`,'allrating')
        const starSnap=await getDoc(starRef)
        const rating=(starSnap.data().star/starSnap.data().count).toFixed(1)
        if(starSnap.data().star===0 && starSnap.data().count===0) setStar(0)
        else setStar(rating)
    }   
    useEffect(()=>{
        setStarRating()
    },[])
    return (
        <Grid item xs={4}>
            <Wrapper onClick={onClick}>
            <CardImg>
                <img src={divisionData[id].img} style={{width:'200px',height:'155px'}}></img>
            </CardImg>
            <CardText>
                <Title>{divisionData[id].name} <StarIcon/>{star}</Title>
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
    font-size:1rem;  
`

const Desc=styled.div`
font-size: 0.9rem;
color:inherit;
line-height: 1.5rem;
`