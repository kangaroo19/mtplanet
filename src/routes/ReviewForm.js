//리뷰 작성부분 컴포넌트
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { doc,addDoc,setDoc,  collection,getDoc, getCountFromServer } from "firebase/firestore";
import { dbService } from "../fbase";
import divisionData from "../data/divisionData";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import styled from "styled-components";
import { Grid } from "@mui/material";
import RadioGroupRating from "../components/RadioGroupRating";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ColorToggleButton from "../components/ColorToggleButton";
function ReviewForm({userObj,isLoggedIn}){
    
    const location=useLocation()
    const navigate=useNavigate()
    const id=location.state.id //현재 보고있는 부대의 id값 , Detail에서 useNavigate에서 전달받음
    const [oneLineReview,setOneLineReview]=useState('') //내가 방금 쓴 리뷰(한개)
    const [goodReview,setGoodReview]=useState('')
    const [badReview,setBadReview]=useState('')
    const [starReview,setStarReview]=useState(null)
    const [roomReview,setRoomReview]=useState(null)
    const [showerReview,setShowerReview]=useState(null)
    const [tolietReview,setTolietReview]=useState(null)
    const [foodReview,setFoodReview]=useState(null)
    const [training,setTrainingReview]=useState(null)
    const [distance,setDistanceReview]=useState(null)
    const [smokeReview,setSmokeReview]=useState(null)
    const [tvReview,setTvReview]=useState(null)
    const [pxReview,setPxReview]=useState(null)

    
    const onSubmit=async(event)=>{
        event.preventDefault()
        if(oneLineReview!=='' && goodReview!=='' && badReview!==''){
            const reviewObj={ //reviewArr에 저장되는 데이터
                displayName:userObj.displayName,
                uid:userObj.uid,
                userImg:userObj.userImg,
                userReview:oneLineReview,
                userGoodReview:goodReview,
                userBadReview:badReview,
                userStarReview:starReview,
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
    const setArmyDB=async()=>{ //데이터베이스(allarmy)에 부대의 정보(이름,주소,별점 )저장 ,랭킹컴포넌트
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
    const onChange=(event)=>{
        const {target:{value,name}}=event
        if(name==='onelinereview') setOneLineReview(value)
        else if(name==='goodreview') setGoodReview(value)
        else setBadReview(value)
    }
    const onChangeStar=(event)=>{
        setStarReview(event.target.value)
    }
    const onRadioChange=(event)=>{
        // console.dir(event.target.parentNode.parentNode.title)
        console.log(event.target.value)
    }
    return (
        <Wrapper>
            <Inner>
            <Title>리뷰 작성하기</Title>
            <Grid mb={5}>
                <Grid container style={{justifyContent:'space-around'}} mb={5} mt={2}>
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
                <Grid container style={{justifyContent:'space-around'}}>
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
                        <Grid><Grid mb={1} style={{fontWeight:'900'}}>흡연</Grid><ColorToggleButton/></Grid>
                        <Grid><Grid mb={1} style={{fontWeight:'900'}}>TV</Grid><ColorToggleButton/></Grid>
                        <Grid><Grid mb={1} style={{fontWeight:'900'}}>PX</Grid><ColorToggleButton/></Grid>
                    </Grid>
                    <Grid style={{display:'flex',justifyContent:"center",}}>
                        <TextField 
                            style={{width:'80%'}} 
                            id="standard-basic" 
                            label="한줄평" 
                            variant="standard" 
                            onChange={onChange} 
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
                        onChange={onChange}
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
                        onChange={onChange} 
                        value={badReview} 
                        name='badreview'
                    />
                    </Grid>
                    <Grid mt={2} mb={2} style={{display:'flex',justifyContent:"center",}}>
                        <Rating onChange={onChangeStar} name="half-rating" defaultValue={Number(2.5)} precision={0.5} size='large'/>
                     </Grid>
                    {/* <Submit type="submit" value='글쓰기'/> */}
                    <Button onClick={onSubmit} variant="contained" style={{width:'80%',margin:'0 auto',display:'block',marginBottom:'20px'}}>글쓰기</Button>
            </Inner>
        </Wrapper>
    )
}

export default ReviewForm

const Wrapper=styled.div`
    width:100%;
    height:100%;
    margin:0 auto;
    margin-top:60px;
    overflow: hidden;
    @media only screen and (min-width:620px){
        max-width:620px;
    }
    border:1px solid rgba(0, 0, 0, 0.12);
`

const Inner=styled.div`
    margin:30px;
`

const Title=styled.div`
    font-weight:900;
    margin-top:20px;
    margin-bottom:30px;
    font-size:2rem;
    text-align:center;
`

//style={{backgroundColor:'white', width:'30%',height:'50px',alignItems:'center',display:'flex',flexDirection:'column'}}
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

const Input=styled.input`
    display:block;
    margin:0 auto;
    margin-top:30px;
    width:80%;
`

const Submit=styled.input`
    width:80%;
    display:block;
    margin:0 auto;
    margin-bottom:20px;
`