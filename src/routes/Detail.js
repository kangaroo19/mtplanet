//실질적으로 부대 리뷰 볼수 있는 화면
//글쓰기 기능

import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import divisionData from "../data/divisionData";
import { dbService } from "../fbase";
import { query, collection, onSnapshot, orderBy,doc,getCountFromServer,setDoc,getDoc } from "firebase/firestore";
import Reviews from "../components/detail/Reviews";
import Error from '../components/login/Error'
import DetailTable from '../components/detail/DetailTable'
import Map from "../components/detail/Map";
import styled from "styled-components";
import ProgressBar from "../components/detail/ProgressBar";
import { Grid } from "@mui/material";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import { Wrapper as MapWrapper } from "@googlemaps/react-wrapper";
function Detail({userObj,isLoggedIn}){
    const [count,setCount]=useState(0)
    const [title,setTitle]=useState(null)
    const [desc,setDesc]=useState(null)
    const [reviewArr,setReviewArr]=useState([]) // 나 포함 다른 사용자들이 쓴 리뷰들
    const [star,setStar]=useState(0)
    const [room,setRoom]=useState(0)
    const [shower,setShower]=useState(0)
    const [toliet,setToliet]=useState(0)
    const [distance,setDistance]=useState(0)
    const [training,setTraining]=useState(0)
    const [food,setFood]=useState(0)
    const [smoke,setSmoke]=useState(0)
    const [tv,setTv]=useState(0)
    const [px,setPx]=useState(0)
    
    const [error,setError]=useState(false)

    const {id}=useParams()
    const navigate=useNavigate() //리디렉션 처리위함
    
    const MAP_API_KEY=process.env.REACT_APP_MAP_ID //구글맵 사용위한 api 키
    useEffect(()=>{
        window.scrollTo(0,0)
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
            setReviewData()
        })
    },[])
    const setReviewData=async()=>{
        const allRatingRef=doc(dbService,`${divisionData[id].title}`,'allrating') //allrating문서에 대한 참조        
        const allData=await getDoc(allRatingRef)
        setCount((allData.data().count))
        setStar((allData.data().count===0)?0:(allData.data().star/allData.data().count).toFixed(1))
        setRoom((allData.data().count===0)?0:(allData.data().room/allData.data().count).toFixed(1))
        setShower((allData.data().count===0)?0:(allData.data().shower/allData.data().count).toFixed(1))
        setToliet((allData.data().count===0)?0:(allData.data().toliet/allData.data().count).toFixed(1))
        setTraining((allData.data().count===0)?0:(allData.data().training/allData.data().count).toFixed(1))
        setFood((allData.data().count===0)?0:(allData.data().food/allData.data().count).toFixed(1))
        setDistance((allData.data().count===0)?0:(allData.data().distance/allData.data().count).toFixed(1))
        setSmoke((allData.data().smoke/allData.data().count<=0.5)?false:true)
        setTv((allData.data().tv/allData.data().count<=0.5)?false:true)
        setPx((allData.data().px/allData.data().count<=0.5)?false:true)

    }
    const goToReviewForm=()=>{ //리뷰작성하는 화면으로 이동 (로그인상태 아닐때는 로그인 페이지로 리디렉션)
        if(isLoggedIn===false){ 
            //alert('ㄴㅇ')
            return setError(true)
        }
        navigate('/reviewform',{state:{id:id,},})
    }

    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    useEffect(()=>{
        const resizeListener = () => { //현재 화면 크기값
            setInnerWidth(window.innerWidth);
          };
          window.addEventListener("resize", resizeListener);
    })

    function callBack(value) { //자식 컴포넌트의 데이터 부모 컴포넌트(app)로 보내기 위함
        setError(value)
    }
    return (
        <Wrapper>
            <Grid>
                <Inner>
                <Title>{title}</Title>
                {innerWidth>=420?
                <Grid container spacing={2} mb={1}>
                <Grid item xs={5}>
                    <Grid mb={1}>
                        <Grid>생활관</Grid>
                        <Grid display='flex' alignContent='center'>
                            <ProgressBar value={room*20}/>
                            <Grid ml={2}>{room}</Grid>
                        </Grid>
                    </Grid>
                    <Grid mb={1}>
                        <Grid>샤워장</Grid>
                        <Grid display='flex' alignContent='center'>
                            <ProgressBar value={shower*20}/>
                            <Grid ml={2}>{shower}</Grid>
                        </Grid>
                    </Grid>
                    <Grid mb={1}>
                        <Grid>화장실</Grid>
                        <Grid display='flex' alignContent='center'>
                            <ProgressBar value={toliet*20}/>
                            <Grid ml={2}>{toliet}</Grid>
                        </Grid>
                    </Grid>
                    <Grid mb={1}>
                        <Grid>훈련강도</Grid>
                        <Grid display='flex' alignContent='center'>
                            <ProgressBar value={training*20}/>
                            <Grid ml={2}>{training}</Grid>
                        </Grid>
                    </Grid>
                    <Grid mb={1}>
                        <Grid>교장거리</Grid>
                        <Grid display='flex' alignContent='center'>
                            <ProgressBar value={distance*20}/>
                            <Grid ml={2}>{distance}</Grid>
                        </Grid>
                    </Grid>
                    <Grid mb={1}>
                        <Grid>밥</Grid>
                        <Grid display='flex' alignContent='center'>
                            <ProgressBar value={food*20}/>
                            <Grid ml={2}>{food}</Grid>
                        </Grid>
                    </Grid>
                    <DetailTable px={px} tv={tv} smoke={smoke}/>
                </Grid>
                <Grid item xs={7} >
                    <Grid height='40%'>
                        <Grid lineHeight='3rem'>
                        <Grid textAlign='center' fontWeight={100} fontSize='1.2rem'>평균별점 : {star}</Grid>

                            <Rating 
                                name="half-rating-read"  
                                defaultValue={0}
                                value={star} 
                                precision={0.1} 
                                readOnly 
                                size="large" 
                                // fontSize="4rem"
                                sx={{fontSize:"4rem",margin:'0 auto',display:'flex',justifyContent:'center',}}/>
                        </Grid>
                    </Grid>
                   <Grid height='60%'>
                        <MapWrapper apiKey={MAP_API_KEY}>
                            <Map id={id}/>
                        </MapWrapper> 
                   </Grid>
                </Grid>
                
            </Grid>:
            // 모바일 화면
            <Grid>
                <Grid height='40%'>
                        <Grid lineHeight='3rem'>
                            <Grid textAlign='center' fontWeight={100} fontSize='1.2rem'>평균별점 : {star}</Grid>
                            <Rating 
                                name="half-rating-read"  
                                defaultValue={0}
                                value={star} 
                                precision={0.1} 
                                readOnly 
                                size="large" 
                                sx={{fontSize:"4rem",margin:'0 auto',display:'flex',justifyContent:'center',}}/>
                        </Grid>
                       <Grid> 
                            <Grid mb={1}>
                                <Grid>생활관</Grid>
                                <Grid display='flex' alignContent='center'>
                                    <ProgressBar value={room*20}/>
                                    <Grid ml={2}>{room}</Grid>
                                </Grid>
                            </Grid>
                            <Grid mb={1}>
                                <Grid>샤워장</Grid>
                                <Grid display='flex' alignContent='center'>
                                    <ProgressBar value={shower*20}/>
                                    <Grid ml={2}>{shower}</Grid>
                                </Grid>
                            </Grid>
                            <Grid mb={1}>
                                <Grid>화장실</Grid>
                                <Grid display='flex' alignContent='center'>
                                    <ProgressBar value={toliet*20}/>
                                    <Grid ml={2}>{toliet}</Grid>
                                </Grid>
                            </Grid>
                            <Grid mb={1}>
                                <Grid>훈련강도</Grid>
                                <Grid display='flex' alignContent='center'>
                                    <ProgressBar value={training*20}/>
                                    <Grid ml={2}>{training}</Grid>
                                </Grid>
                            </Grid>
                            <Grid mb={1}>
                                <Grid>교장거리</Grid>
                                <Grid display='flex' alignContent='center'>
                                    <ProgressBar value={distance*20}/>
                                    <Grid ml={2}>{distance}</Grid>
                                </Grid>
                            </Grid>
                            <Grid mb={1}>
                                <Grid>밥</Grid>
                                <Grid display='flex' alignContent='center'>
                                    <ProgressBar value={food*20}/>
                                    <Grid ml={2}>{food}</Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid>
                            <DetailTable px={px} tv={tv} smoke={smoke}/>
                        </Grid>
                        <Grid height={100}>
                            <MapWrapper apiKey={MAP_API_KEY}>
                                <Map id={id}/>
                            </MapWrapper> 
                        </Grid>
                    </Grid>
                </Grid>
            }
                </Inner>
            </Grid>
            <Grid mt={2}>
                <Inner>
                    <Grid display='flex' justifyContent='right' mt={1} sx={{borderBottom:'2px solid #e4e4e4'}} >
                        <Button variant="contained" onClick={goToReviewForm}>
                            <CreateIcon/>리뷰 작성하기
                        </Button>
                    </Grid>
                    <Grid mb={5}>
                        {count===0?
                        <None>😭아무것도 없어요😭</None>: //리뷰 없을때 나타남
                        <>{reviewArr.map((value,idx)=>(
                            <Reviews
                                key={idx}
                                reviewObj={value}
                                />
                        ))}</>    
                    }
                    </Grid>
                </Inner>
            </Grid>
            {error
                ? <Error error='리뷰를 작성하려면 로그인이 필요합니다.' callBack={callBack}/>
                : null
            }
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
    @media only screen and (max-width:800px){
        margin-top:20px;
    }
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

const None=styled.div`
    font-size:3rem;
    font-weight:900;
    text-align:center;
    height:300px;
    line-height:300px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    @media only screen and (max-width:420px){
        font-size:2rem;
    }
`
