import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";
import styled from "styled-components";
import { useEffect, useState } from "react";
function Profile({refreshUser,userObj}){
    const [name,setName]=useState(null)
    const [img,setImg]=useState(null)
    useEffect(()=>{
        setDisplay()
    },[])
    const setDisplay=async()=>{ 
        await setName(userObj.displayName)
        await setImg(userObj.userImg)
    }
    const navigate=useNavigate()
    const onLogOutClick=()=>{
        signOut(authService)
        // 카톡로그아웃 구현해야됨
        navigate('/') //homepage로 리다이렉트
    }
    return (
        <Wrapper>
            <h1>내 이름:{name}</h1>
            {/* <h1>내 id : {userObj.uid}</h1> */}
            <img src={img} alt="" />
            <button onClick={onLogOutClick}>로그아웃</button>
        </Wrapper>
    )
}

export default Profile

//setDisplay함수 사용이유는 jsx에서 userObj.어쩌고 식으로 다이렉트로 넣으면
//불러오는 시간 때문인지 null값으로 들어가기 때문
//근데 왜인진 모르겠는데 userObj 그냥 콘솔로 찍어보면 얘는 잘 나옴..

const Wrapper=styled.div`
    margin-top:50px;
`