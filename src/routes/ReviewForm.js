//리뷰 작성부분 컴포넌트
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { doc,addDoc,setDoc,  collection,getDoc, getCountFromServer } from "firebase/firestore";
import { dbService } from "../fbase";
import divisionData from "../data/divisionData";
import Rating from '@mui/material/Rating';
import styled from "styled-components";
import { Grid } from "@mui/material";
import RadioGroupRating from "../components/reviewform/RadioGroupRating";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ColorToggleButton from "../components/reviewform/ColorToggleButton";
import DatePicker from "../components/reviewform/DatePicker";

function ReviewForm({userObj,isLoggedIn}){
    
    const location=useLocation()
    const navigate=useNavigate()
    const id=location.state.id //현재 보고있는 부대의 id값 , Detail에서 useNavigate에서 전달받음
    const [oneLineReview,setOneLineReview]=useState('') //내가 방금 쓴 리뷰(한개)
    const [goodReview,setGoodReview]=useState('')
    const [badReview,setBadReview]=useState('')
    const [starReview,setStarReview]=useState(3)
    const [roomReview,setRoomReview]=useState(3)
    const [showerReview,setShowerReview]=useState(3)
    const [tolietReview,setTolietReview]=useState(3)
    const [foodReview,setFoodReview]=useState(3)
    const [trainingReview,setTrainingReview]=useState(3)
    const [distanceReview,setDistanceReview]=useState(3)
    const [smokeReview,setSmokeReview]=useState(1)
    const [tvReview,setTvReview]=useState(1)
    const [pxReview,setPxReview]=useState(1)
    const [year,setYear]=useState('2023')
    const [month,setMonth]=useState('1')
     
    const onSubmit=async(event)=>{ //리뷰 제출
        event.preventDefault()
        if(oneLineReview!=='' && goodReview!=='' && badReview!==''){
            const reviewObj={ //reviewArr에 저장되는 데이터,db에 저장됨
                displayName:userObj.displayName,
                uid:userObj.uid,
                userImg:userObj.userImg,
                userReview:oneLineReview,
                userGoodReview:goodReview,
                userBadReview:badReview,
                userStarReview:starReview,
                userRoomReview:roomReview,
                userShowerReview:showerReview,
                userTolietReview:tolietReview,
                userTrainingReview:trainingReview,
                userDistanceReview:distanceReview,
                userFoodReivew:foodReview,
                userSmokeReview:smokeReview,
                userTvReview:tvReview,
                userPxReview:pxReview,
                userYear:year,
                userMonth:month,
                date:Date.now(),
            }
            const reviewDocRef=await addDoc(collection(dbService,`${divisionData[id].title}`),reviewObj) //내가 작성한 reviewObj 해당 부대의 데이터베이스 저장

            let starDocRef=doc(dbService,`${divisionData[id].title}`,'allrating')
            const starSnapshot=await getDoc(starDocRef)
            
            const countDocRef = collection(dbService, `${divisionData[id].title}`); //총 리뷰 개수
            const countSnapshot = await getCountFromServer(countDocRef);
            const starObj={ //부대의 평균 별점 내기 위함
                star:starSnapshot.data().star+Number(reviewObj.userStarReview), //방금 내가 선택한 별점과 데이터베이스에 저장된 별점 더함
                count:countSnapshot.data().count-1, //해당 부대에 저장된 문서 갯수
                room:starSnapshot.data().room+reviewObj.userRoomReview,
                shower:starSnapshot.data().shower+reviewObj.userShowerReview,
                toliet:starSnapshot.data().toliet+reviewObj.userTolietReview,
                training:starSnapshot.data().training+reviewObj.userTolietReview,
                distance:starSnapshot.data().distance+reviewObj.userDistanceReview,
                food:starSnapshot.data().food+reviewObj.userFoodReivew,
                smoke:starSnapshot.data().smoke+reviewObj.userSmokeReview,
                tv:starSnapshot.data().tv+reviewObj.userTvReview,
                px:starSnapshot.data().px+reviewObj.userPxReview,
            }
            starDocRef=await setDoc(doc(dbService,`${divisionData[id].title}`,'allrating'),starObj)
            setOneLineReview('')
            setGoodReview('')
            setBadReview('')
            navigate(`/detail/${id}`) //리뷰 작성 완료 후 해당 부대 페이지로 리디렉션
       
        }
        setArmyDB() //해당 부대의 리뷰개수 +1, 내가 준 별점까지 평균값 내기 위함 
        //여기서 이 함수 없으면 ranking에서 바로 반영 안되고
        //home 컴포넌트(useEffect) 한번 거쳐야됨
        //이 함수에서 정한 db값(allarmy 컬렉션)을 토대로 ranking 정해짐
    }
    const setArmyDB=async()=>{ //데이터베이스(allarmy)에 부대의 정보(이름,주소,별점 등등 )저장 ,랭킹컴포넌트
        const starRef=doc(dbService,`${divisionData[id].title}`,'allrating')
        const starSnap=await getDoc(starRef)
        await setDoc(doc(dbService,"allarmy",`${divisionData[id].title}`),{
            title:divisionData[id].name,
            desc:divisionData[id].desc,
            img:divisionData[id].img,
            rating:(starSnap.data().star===0 && starSnap.data().count===0)?0:Number((starSnap.data().star/starSnap.data().count).toFixed(1)),
            
            count:starSnap.data().count,
            routing:id,
          })
    }
    const onChangeReviews=(event)=>{ //한줄평,장점,단점 값 설정
        const {target:{value,name}}=event
        if(name==='onelinereview') setOneLineReview(value)
        else if(name==='goodreview') setGoodReview(value)
        else setBadReview(value)
    }
    const onChangeStar=(event)=>{ //별점 값 설정 
        setStarReview(event.target.value)
    }
    const onRadioChange=(event)=>{ //colorTogglebutton 컴포넌트 값 설정
        const {parentNode:{title}}=event.target.parentNode
        const value=Number(event.target.value)
        switch(title){
            case 'room': 
                setRoomReview(value)
                break
            case 'shower':
                setShowerReview(value)
                break
            case 'toliet':
                setTolietReview(value)
                break
            case 'training':
                setTrainingReview(value)
                break
            case 'distance':
                setDistanceReview(value)
                break
            case 'food':
                setFoodReview(value)
                break    
        }
    }
    
    const childToParentToggle=(id,value)=>{ //원래상태 그대로(true,아무것도 클릭안햇을때(onChange가 트리거되지 않을때))보내면 id는 null이지만 초기값이 true라 상관없음
        if(id==='smoke') setSmokeReview(Number(value))
        else if(id==='tv') setTvReview(Number(value))
        else if(id==='px') setPxReview(Number(value))
    }
    
    const childToParentDate=(year,month)=>{
        setYear(year)
        setMonth(month)
    }
    return (
        <Wrapper>
            <Inner>
            <Title>리뷰 작성하기</Title>
            <Grid mb={5}>
                <Grid>
                    <DatePicker childToParentDate={childToParentDate}/>
                </Grid>
                <Grid container style={{justifyContent:'space-between'}} mb={5} mt={2}>
                    <RadioInner onChange={onRadioChange} title='room'>
                        <Grid style={{textAlign:'center',fontWeight:'900'}}>생활관</Grid>
                        <RadioGroupRating n='room'/>
                    </RadioInner>
                    <RadioInner onChange={onRadioChange} title='shower'>
                        <Grid style={{textAlign:'center',fontWeight:'900',}}>샤워장</Grid>
                        <RadioGroupRating/>
                    </RadioInner>
                    <RadioInner onChange={onRadioChange} title='toliet'>
                        <Grid style={{textAlign:'center',fontWeight:'900',}}>화장실</Grid>
                        <RadioGroupRating/>
                    </RadioInner>
                </Grid>
                <Grid container style={{justifyContent:'space-between'}}>
                    <RadioInner onChange={onRadioChange} title='training'>
                        <Grid style={{textAlign:'center',fontWeight:'900',}}>훈련강도</Grid>
                        <RadioGroupRating/>
                    </RadioInner>
                    <RadioInner onChange={onRadioChange} title='distance'>
                        <Grid style={{textAlign:'center',fontWeight:'900',}}>교장거리</Grid>
                        <RadioGroupRating/>
                    </RadioInner>
                    <RadioInner onChange={onRadioChange} title='food'>
                        <Grid style={{textAlign:'center',fontWeight:'900',}}>밥</Grid>
                        <RadioGroupRating/>
                    </RadioInner>
                    </Grid>
                </Grid>
                <Grid container style={{display:'flex',justifyContent:"space-around",}}>
                    <Grid id='smoke'><Grid mb={1} style={{fontWeight:'900'}}>흡연</Grid><ColorToggleButton childToParentToggle={childToParentToggle}/></Grid>
                    <Grid id='tv' ><Grid mb={1} style={{fontWeight:'900'}}>TV</Grid><ColorToggleButton childToParentToggle={childToParentToggle}/></Grid>
                    <Grid id='px'><Grid mb={1} style={{fontWeight:'900'}}>PX</Grid><ColorToggleButton childToParentToggle={childToParentToggle}/></Grid>
                </Grid>
                <Grid style={{display:'flex',justifyContent:"center",}}>
                    <TextField 
                        style={{width:'80%'}} 
                        id="standard-basic" 
                        label="한줄평" 
                        variant="standard" 
                        onChange={onChangeReviews} 
                        value={oneLineReview} 
                        name='onelinereview'/>
                </Grid>
                <Grid mt={2} style={{display:'flex',justifyContent:"center",}}>
                    <TextField
                        style={{width:'80%'}}
                        id="filled-multiline-static"
                        label="장점"
                        multiline
                        rows={4}
                        variant="filled"
                        onChange={onChangeReviews}
                        value={goodReview} 
                        name='goodreview'
                    />
                </Grid>
                <Grid mt={2} style={{display:'flex',justifyContent:"center",}}>
                    <TextField
                        style={{width:'80%'}}
                        id="filled-multiline-static"
                        label="단점"
                        multiline
                        rows={4}
                        variant="filled"
                        onChange={onChangeReviews} 
                        value={badReview} 
                        name='badreview'
                    />
                </Grid>
                <Grid mt={2} mb={2} style={{display:'flex',justifyContent:"center",}}>
                    <Rating onChange={onChangeStar} name="half-rating" defaultValue={Number(3)} precision={0.5} size='large'/>
                </Grid>
                <Button 
                    onClick={onSubmit} 
                    variant="contained" 
                    style={{
                        width:'80%',
                        margin:'0 auto',
                        display:'block',
                        marginBottom:'20px'
                        }}>글쓰기
                </Button>
            </Inner>
        </Wrapper>
    )
}

export default ReviewForm

const Wrapper=styled.div`
    background-color:#e9e9e9;
    margin-top:50px;
    
`

const Inner=styled.div`
    width:100%;
    background-color:white;
    height:100%;
    margin:0 auto;
    overflow: hidden;
    padding:30px;
    @media only screen and (min-width:500px){
        max-width:500px;
    }
    border:1px solid rgba(0, 0, 0, 0.12);
`

const Title=styled.div`
    font-weight:900;
    margin-top:20px;
    margin-bottom:30px;
    font-size:2rem;
    text-align:center;
`

const RadioInner=styled.div`
    background-color:rgba(0, 0, 0, 0.12);
    border-radius:10px;
    width:30%;
    height:50px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

