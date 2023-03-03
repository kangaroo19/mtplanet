//홈 화면에 그려지는 각각의 신교대 목록들
//신교대 클릭시 해당 부대 게시판(Detail.js)으로 이동
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import Grid from '@mui/material/Grid';
import divisionData from "../../data/divisionData";
import { collection, doc, getCountFromServer, getDoc, setDoc } from "firebase/firestore";
import { dbService } from "../../fbase";
import { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
function BootCamp({id,title}){
    const [star,setStar]=useState(0)
    const navigate=useNavigate()
    const initDocRef=collection(dbService,`${divisionData[id].title}`)
    const onClickRouting=async()=>{ //라우팅 처리 해당부대 디테일 컴포넌트로 이동 
        navigate(`/detail/${id}`)
        
    }

    const getStarRating=async()=>{ //해당부대(컬렉션)=>allrating(문서)에 저장된 이 부대의 평균별점 가져옴
        const starRef=doc(dbService,`${divisionData[id].title}`,'allrating')
        const starSnap=await getDoc(starRef)
        const rating=(starSnap.data().star/starSnap.data().count).toFixed(1)
        if(starSnap.data().star===0 && starSnap.data().count===0) setStar(0)
        else setStar(rating)
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
    const initArmy=async(ref)=>{
        const initSnapshot=await getCountFromServer(ref)
        if(initSnapshot.data().count===0){ 
            await setDoc(doc(dbService,`${divisionData[id].title}`,'allrating'),{star:0,count:0})
        }
    }
    useEffect(()=>{
        initArmy(initDocRef) //만약 아무도 리뷰 작성하지 않앗을때 해당부대 컬렉션 만들고 allrating문서까지 만듦 그리고 allrating {count:0,rating:0}으로 초기화
        getStarRating() //별점평균값 가져오기 위함
        setArmyDB() //이 부대가 처음 생겼을때 초기화 위함,reviewform 컴포넌트에서 재사용 하였음
    },[])
    
    return (
        <Grid item xs={4}>
            <Wrapper onClick={onClickRouting}>
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