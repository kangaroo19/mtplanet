//실질적으로 부대 리뷰 볼수 있는 화면
//글쓰기 기능

import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import divisionData from "../data/divisionData";
import { dbService } from "../fbase";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import Reviews from "../components/detail/Reviews";
import Map from "../components/detail/Map";
import styled from "styled-components";
import ProgressBar from "../components/detail/ProgressBar";
import { Grid } from "@mui/material";
import Rating from '@mui/material/Rating';
function Detail({userObj,isLoggedIn}){
    const [title,setTitle]=useState(null)
    const [desc,setDesc]=useState(null)
    const [reviewArr,setReviewArr]=useState([]) // 나 포함 다른 사용자들이 쓴 리뷰들
    const {id}=useParams()
    const navigate=useNavigate() //리디렉션 처리위함
    
    useEffect(()=>{
        setTitle(divisionData[id].name)
        setDesc(divisionData[id].desc)
        const q=query(collection(dbService,`${divisionData[id].title}`),orderBy('date','desc'))
        const un=onSnapshot(q,(snapshot)=>{ //데이터베이스에 변화가 생기면 onSnapshot 실행됨
            const arr=[]
            snapshot.forEach((doc)=>{
                arr.push({
                    id:doc.id, //여기 id는 creatorid와 다름
                    ...doc.data()
                })
            })
            setReviewArr(arr) 
            //console.log(reviewArr)
        })
    },[])

    const goToReviewForm=()=>{ //리뷰작성하는 화면으로 이동 (로그인상태 아닐때는 로그인 페이지로 리디렉션)
        if(!isLoggedIn){ 
            alert('로그인 필요')
            navigate('/login')
            return 
        }
        navigate('/reviewform',{state:{id:id,},})
    }
    return (
        <Wrapper>
            <Inner>
                <Title>{title}</Title>
                {/* <h2>{desc}</h2> */}
                <Grid container>
                    <Grid item xs={5}>
                        <Grid mb={1}>
                            <Grid>생활관</Grid>
                            <Grid display='flex' alignContent='center'>
                                <ProgressBar value={76}/>
                                <Grid ml={2}>3.8</Grid>
                            </Grid>
                        </Grid>
                        <Grid mb={1}>
                            <Grid>샤워장</Grid>
                            <Grid display='flex' alignContent='center'>
                                <ProgressBar value={36}/>
                                <Grid ml={2}>1.8</Grid>
                            </Grid>
                        </Grid>
                        <Grid mb={1}>
                            <Grid>화장실</Grid>
                            <Grid display='flex' alignContent='center'>
                                <ProgressBar value={96}/>
                                <Grid ml={2}>4.8</Grid>
                            </Grid>
                        </Grid>
                        <Grid mb={1}>
                            <Grid>훈련강도</Grid>
                            <Grid display='flex' alignContent='center'>
                                <ProgressBar value={40}/>
                                <Grid ml={2}>2.0</Grid>
                            </Grid>
                        </Grid>
                        <Grid mb={1}>
                            <Grid>교장거리</Grid>
                            <Grid display='flex' alignContent='center'>
                                <ProgressBar value={50}/>
                                <Grid ml={2}>2.5</Grid>
                            </Grid>
                        </Grid>
                        <Grid mb={1}>
                            <Grid>밥</Grid>
                            <Grid display='flex' alignContent='center'>
                                <ProgressBar value={20}/>
                                <Grid ml={2}>1.0</Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={7} >
                        <Grid height='40%'>
                            <Grid>
                            <Grid textAlign='center'>평균별점</Grid>

                                <Rating 
                                    name="half-rating-read"  
                                    defaultValue={2.5} 
                                    precision={0.5} 
                                    readOnly 
                                    size="large" 
                                    sx={{fontSize: "3rem",margin:'0 auto',display:'flex',justifyContent:'center',}}/>
                            </Grid>
                        </Grid>
                       <Grid height='60%'>
                     <Map/>

                       </Grid>
                    </Grid>
                    
                </Grid>

                {reviewArr.map((value,idx)=>(
                    <Reviews
                        key={idx}
                        reviewObj={value}/>
                ))}
                <button onClick={goToReviewForm}>리뷰 작성하기</button>
            </Inner>
        </Wrapper>
    )
}

export default Detail

//https://velog.io/@gml9812/useState%EC%99%80-useEffect-%EC%A2%80-%EB%8D%94-%EA%B9%8A%EA%B2%8C-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0
//setReviewArr함수(useState)는 현재 랜더의 reviewArr를 바꾸는 함수가 아님
//다음랜더의 값을 바꿈
//그러므로 이후 콘솔로그를 찍어도 현재 랜더의 reviewArr값이 나옴
//어쨋든 값은 제대로 전달되긴함

const Wrapper=styled.div`
    background-color:#e9e9e9;
    margin-top:50px;
`

const Inner=styled.div`
    background-color:white;
    padding:20px;
    width:100%;
    height:100%;
    margin:0 auto;
    overflow: hidden;
    @media only screen and (min-width:800px){
        max-width:800px;
    }
`

const Title=styled.div`
    text-align: center;
    font-size:2rem;
    margin-top:10px;
    margin-bottom:30px;
    font-weight:900;
`