//리뷰 작성부분 컴포넌트
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { addDoc,  collection, } from "firebase/firestore";
import { dbService } from "../fbase";
import divisionData from "../data/divisionData";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
function ReviewForm({userObj,isLoggedIn}){
    const location=useLocation()
    const navigate=useNavigate()
    const id=location.state.id //현재 보고있는 부대의 id값 , Detail에서 useNavigate에서 전달받음
    const [oneLineReview,setOneLineReview]=useState('') //내가 방금 쓴 리뷰(한개)
    const [goodReview,setGoodReview]=useState('')
    const [badReview,setBadReview]=useState('')
    const [starReview,setStarReview]=useState(null)
    const onSubmit=async(event)=>{
        event.preventDefault()
        if(oneLineReview!=='' && goodReview!=='' && badReview!==''){
          const reviewObj={ //reveiwArr에 저장되는 데이터
            displayName:userObj.displayName,
            uid:userObj.uid,
            userImg:userObj.userImg,
            userReview:oneLineReview,
            userGoodReview:goodReview,
            userBadReview:badReview,
            userStarReview:starReview,
            date:Date.now(),
          }
          const docRef=await addDoc(collection(dbService,`${divisionData[id].title}`),reviewObj)
          setOneLineReview('')
          setGoodReview('')
          setBadReview('')
          navigate(`/detail/${id}`) //리뷰 작성 완료 후 해당 부대 페이지로 리디렉션
        }
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
    return (
        <>
            <form onSubmit={onSubmit} action="">
                    <input onChange={onChange} value={oneLineReview} name='onelinereview'type="text" placeholder="한줄평"/>
                    <br />
                    <input onChange={onChange} value={goodReview} name='goodreview' type="text" placeholder="장점"/>
                    <br />
                    <input onChange={onChange} value={badReview} name='badreview' type="text" placeholder="단점"/>
                    <br/>
                    <Stack spacing={1}>
                        <Rating onChange={onChangeStar} name="half-rating" defaultValue={2.5} precision={0.5} />
                     </Stack>
                    <input type="submit" value='글쓰기'/>
                    
            </form>
        </>
    )
}

export default ReviewForm