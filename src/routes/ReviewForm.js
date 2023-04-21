//리뷰 작성부분 컴포넌트

//2023/03/22
//원래는 각각의 별점 요소들을 따로따로 변수로 선언해서 처리하였으나 
//리펙토링 위해 하나의 객체로 묶으려고 함 (reviewObj)
//===>근데 코드 리펙토링중 childToParentDate,childToParentToggle함수에서 오류발생
//무한루프빠짐
//둘 다 부모로 보내는 함수인 점이 공통점인것으로 보아 부모 컴포넌트 확인 해야될듯
//나머지는 오류없음
//자식에서 부모로 보내는 함수를 useEffect사용하여 특정 값 바뀔때만 함수 실행되도록 하였음

//2023/03/24
//DatePicker에서 년,월,일을 선택하면 값은제대로 받으나
//useState(reviewObj.년)
//useState(reviewObj.월)
//이렇게 했는데 월은 제대로 값이 들어가는데 년은 제대로 안들어감
//두줄로 나눈 useState문을 한줄로
//useState(reviewObj.년,reviewObj.월) 이렇게하니까 제대로됨
//useState를 연속으로 사용시 마지막 useState만 반영됨
import { memo, useCallback, useState, } from "react";
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

function ReviewForm({userObj}){
    console.log('ReviewForm is rerendered')
    const location=useLocation()
    const navigate=useNavigate()
    const id=location.state.id //현재 보고있는 부대의 id값 , Detail에서 useNavigate에서 전달받음

    const [reviewObj,setReviewObj]=useState({ //사용자가 작성한 리뷰의 정보(작성자 정보 포함)
        displayName:userObj.displayName,
        uid:userObj.uid,
        userImg:userObj.userImg,
        userReview:'',
        userGoodReview:'',
        userBadReview:'',
        userStarReview:3,
        userRoomReview:3,
        userShowerReview:3,
        userTolietReview:3,
        userFoodReview:3,
        userTrainingReview:3,
        userDistanceReview:3,
        userSmokeReview:1,
        userTvReview:1,
        userPxReview:1,
        userYear:'2023',
        userMonth:'01',
        date:Date.now(),
    })
    
    
    const onSubmit=async(event)=>{ //리뷰 제출
        event.preventDefault()
        
        if(reviewObj.userReview==='' || reviewObj.userGoodReview==='' || reviewObj.userBadReview===''){
            alert('입력되지 않은 입력필드가 있습니다') //후에 error컴포넌트로 대체
            return
        } 
            
        await addDoc(collection(dbService,`${divisionData[id].title}`),reviewObj) //내가 작성한 reviewObj 해당 부대의 데이터베이스 저장

        let starDocRef=doc(dbService,`${divisionData[id].title}`,'allrating') //starDocRef는 부대이름(컬렉션)->allrating(문서)에 대한 참조
        const starSnapshot=await getDoc(starDocRef) //allrating 데이터 가져옴
                
        const countDocRef = collection(dbService, `${divisionData[id].title}`); //총 리뷰 개수
        const countSnapshot = await getCountFromServer(countDocRef);
        const starObj={ //부대의 평균 별점 내기 위함
            star:starSnapshot.data().star+Number(reviewObj.userStarReview), //방금 내가 선택한 별점과 데이터베이스에 저장된 별점 더함
            count:countSnapshot.data().count-1, //해당 부대에 저장된 문서 갯수
            room:starSnapshot.data().room+reviewObj.userRoomReview,
            shower:starSnapshot.data().shower+reviewObj.userShowerReview,
            toliet:starSnapshot.data().toliet+reviewObj.userTolietReview,
            training:starSnapshot.data().training+reviewObj.userTrainingReview,
            distance:starSnapshot.data().distance+reviewObj.userDistanceReview,
            food:starSnapshot.data().food+reviewObj.userFoodReview,
            smoke:starSnapshot.data().smoke+reviewObj.userSmokeReview,
            tv:starSnapshot.data().tv+reviewObj.userTvReview,
            px:starSnapshot.data().px+reviewObj.userPxReview,
        }
        starDocRef=await setDoc(doc(dbService,`${divisionData[id].title}`,'allrating'),starObj)
        navigate(`/detail/${id}`) //리뷰 작성 완료 후 해당 부대 페이지로 리디렉션
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
        if(name==='onelinereview') {
            setReviewObj({
                ...reviewObj,
                userReview:value  
            })
        }
        else if(name==='goodreview'){
            setReviewObj({
                ...reviewObj,
                userGoodReview:value  
            })
        }
        else {
            setReviewObj({
                ...reviewObj,
                userBadReview:value,
            })
        }
    }
    const onChangeStar=(event)=>{ //별점 값 설정 
        setReviewObj({...reviewObj,userStarReview:event.target.value})
    }
    const onChangeRadio=(event)=>{ //colorTogglebutton 컴포넌트 값 설정
        const {parentNode:{title}}=event.target.parentNode
        const value=Number(event.target.value)
        switch(title){
            case 'room': 
                setReviewObj({...reviewObj,userRoomReview:value})
                break
            case 'shower':
                setReviewObj({...reviewObj,userShowerReview:value})
                break
            case 'toliet':
                setReviewObj({...reviewObj,userTolietReview:value})
                break
            case 'training':
                setReviewObj({...reviewObj,userTrainingReview:value})
                break
            case 'distance':
                setReviewObj({...reviewObj,userDistanceReview:value})
                break
            case 'food':
                setReviewObj({...reviewObj,userFoodReview:value})
                break    
        }
    }
    
    const onClickToggle=(event)=>{ //onChangeRadio 함수(위에거)와 사실상 동일한 기능이라 같이 넣을라 했는데 mui에서 가져온 토글 버튼은 onChange함수 안되서 나눔
        const {parentNode:{id}}=event.target.parentNode
        const value=Number(event.target.value)
        if(id==='smoke')  setReviewObj({...reviewObj,userSmokeReview:value})
        else if(id==='tv') setReviewObj({...reviewObj,userTvReview:value})
        else setReviewObj({...reviewObj,userPxReview:value})
    }
    
    const childToParentDate=useCallback((year,month,)=>{ //DatePicker(자식)에서 받아온 입영날짜 정보 reviewObj(부모)에 저장
        setReviewObj({...reviewObj,userYear:year,userMonth:month})
    },[reviewObj.year])
    const onClickTest=()=>{
        console.log(reviewObj)
    }
    return (
        <Wrapper>
            <Inner>
            <Title>리뷰 작성하기</Title>
            <Grid mb={5}>
                <Grid container width='100%' display='flex' justifyContent='center' alignItems='center'>
                    <Grid><DatePicker childToParentDate={childToParentDate}/></Grid>
                    
                </Grid>
                <Grid container style={{justifyContent:'space-between'}} mb={5} mt={2}>
                    <RadioInner onChange={onChangeRadio} title='room'>
                        <Grid style={{textAlign:'center',fontWeight:'900'}}>생활관</Grid>
                        <RadioGroupRating/>
                    </RadioInner>
                    <RadioInner onChange={onChangeRadio} title='shower'>
                        <Grid style={{textAlign:'center',fontWeight:'900',}}>샤워장</Grid>
                        <RadioGroupRating/>
                    </RadioInner>
                    <RadioInner onChange={onChangeRadio} title='toliet'>
                        <Grid style={{textAlign:'center',fontWeight:'900',}}>화장실</Grid>
                        <RadioGroupRating/>
                    </RadioInner>
                </Grid>
                <Grid container style={{justifyContent:'space-between'}}>
                    <RadioInner onChange={onChangeRadio} title='training'>
                        <Grid style={{textAlign:'center',fontWeight:'900',}}>훈련강도</Grid>
                        <RadioGroupRating/>
                    </RadioInner>
                    <RadioInner onChange={onChangeRadio} title='distance'>
                        <Grid style={{textAlign:'center',fontWeight:'900',}}>교장거리</Grid>
                        <RadioGroupRating/>
                    </RadioInner>
                    <RadioInner onChange={onChangeRadio} title='food'>
                        <Grid style={{textAlign:'center',fontWeight:'900',}}>밥</Grid>
                        <RadioGroupRating/>
                    </RadioInner>
                    </Grid>
                </Grid>
                <Grid container style={{display:'flex',justifyContent:"space-around",}}>
                    <Grid id='smoke' onClick={onClickToggle}><Grid mb={1} style={{fontWeight:'900'}}>흡연</Grid><ColorToggleButton name={'smoke'}/></Grid>
                    <Grid id='tv' onClick={onClickToggle}><Grid mb={1} style={{fontWeight:'900'}}>TV</Grid><ColorToggleButton name={'tv'}/></Grid>
                    <Grid id='px' onClick={onClickToggle}><Grid mb={1} style={{fontWeight:'900'}}>PX</Grid><ColorToggleButton name={'px'}/></Grid>
                </Grid>
                <Grid style={{display:'flex',justifyContent:"center",marginTop:'10px'}}>
                    <TextField 
                        style={{width:'80%'}} 
                        id="standard-basic" 
                        label="한줄평" 
                        variant="filled" 
                        onChange={onChangeReviews} 
                        value={reviewObj.oneLineReview} 
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
                        value={reviewObj.goodReview} 
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
                        value={reviewObj.badReview} 
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
                <button onClick={onClickTest}>테스트</button>
            </Inner>
        </Wrapper>
    )
}
export default memo(ReviewForm)

const Wrapper=styled.div`
    background-color:#e9e9e9;
    margin-top:50px;
    @media only screen and (max-width:420px){
        margin-top:10px;
        margin-bottom:60px;
    }
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
    @media only screen and (max-width:420px){
        padding:5px;
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
    @media only screen and (max-width:420px){
        width:33%;
    }
`

