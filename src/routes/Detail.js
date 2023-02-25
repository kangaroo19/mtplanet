//실질적으로 부대 리뷰 볼수 있는 화면
//글쓰기 기능

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams,useLocation } from "react-router-dom";
import divisionData from "../data/divisionData";
import { dbService } from "../fbase";
import { setDoc,doc,getDoc,addDoc, query, collection, onSnapshot, QuerySnapshot, orderBy, where } from "firebase/firestore";
import Reviews from "../components/Reviews";
function Detail({userObj,isLoggedIn}){
    const [title,setTitle]=useState(null)
    const [desc,setDesc]=useState(null)
    const [review,setReview]=useState('') //내가 방금 쓴 리뷰(한개)
    const [reviewArr,setReviewArr]=useState([]) // 나 포함 다른 사용자들이 쓴 리뷰들
    const location=useLocation()
    const {id}=useParams()
    
    useEffect(()=>{
        setTitle(divisionData[id].title)
        setDesc(divisionData[id].desc)
        const q=query(collection(dbService,`${divisionData[id].title}`))
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
    const onSubmit=async(event)=>{
        event.preventDefault()
        if(!isLoggedIn){ //로그인 상태 아닐때 글 못쓰게하기 위함
            alert('로그인 필요')
        }
        else if(review!==''){
          const reviewObj={
            displayName:userObj.displayName,
            uid:userObj.uid,
            userImg:userObj.userImg,
            userReview:review,
          }
          const docRef=await addDoc(collection(dbService,`${divisionData[id].title}`),reviewObj)
          setReview('')
        }
    }
    const onChange=(event)=>{
        const {target:{value}}=event
        setReview(value)
    }
    return (
        <div>
            <h1>{title}</h1>
            <h2>{desc}</h2>
            {reviewArr.map((value,idx)=>(
                <Reviews
                    key={idx}
                    reviewObj={value}/>
            ))}
            <form onSubmit={onSubmit} action="">
                <input onChange={onChange} value={review} type="text" />
                <input  type="submit" value='글쓰기'/>
            </form>
        </div>
    )
}

export default Detail

//https://velog.io/@gml9812/useState%EC%99%80-useEffect-%EC%A2%80-%EB%8D%94-%EA%B9%8A%EA%B2%8C-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0
//setReviewArr함수(useState)는 현재 랜더의 reviewArr를 바꾸는 함수가 아님
//다음랜더의 값을 바꿈
//그러므로 이후 콘솔로그를 찍어도 현재 랜더의 reviewArr값이 나옴
//어쨋든 값은 제대로 전달되긴함