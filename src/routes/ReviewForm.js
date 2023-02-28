//리뷰 작성부분 컴포넌트
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { doc,addDoc,setDoc,  collection,getDoc, getCountFromServer } from "firebase/firestore";
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
            const reviewDocRef=await addDoc(collection(dbService,`${divisionData[id].title}`),reviewObj)

            let starDocRef=doc(dbService,`${divisionData[id].title}`,'allrating')
            const starSnapshot=await getDoc(starDocRef)
            
            const countDocRef = collection(dbService, `${divisionData[id].title}`); //총 리뷰 개수
            const countSnapshot = await getCountFromServer(countDocRef);
            const starObj={ //부대의 평균 별점 내기 위함
                star:starSnapshot.data().star+Number(reviewObj.userStarReview), //방금 내가 선택한 별점과 데이터베이스에 저장된 별점 더함
                count:countSnapshot.data().count-1, //해당 부대에 저장된 문서 갯수
            }
            starDocRef=await setDoc(doc(dbService,`${divisionData[id].title}`,'allrating'),starObj)
            console.log(starObj)
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
                        <Rating onChange={onChangeStar} name="half-rating" defaultValue={Number(0)} precision={0.5} />
                     </Stack>
                    <input type="submit" value='글쓰기'/>
                    
            </form>
        </>
    )
}

export default ReviewForm

//allrating 문서이름
//star:0
//count:0