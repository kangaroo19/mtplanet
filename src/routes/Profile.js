//내이름과 사진 볼 수 있는 프로필 컴포넌트

import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";
import styled from "styled-components";
import Avatar from '@mui/material/Avatar';
import { useEffect, useState,useRef } from "react";
function Profile({refreshUser,userObj}){
    const [name,setName]=useState(null)
    const [img,setImg]=useState(null)
    useEffect(()=>{
        setDisplay()
    },[]) 
    const setDisplay= ()=>{  //userObj 객체를 불러오는게 느린지 await 문 없으면 userObj가 null값으로 들어옴
        setName(userObj.displayName)
        setImg(userObj.userImg)
    }
    const navigate=useNavigate()
    const onLogOutClick=()=>{
        signOut(authService)
        // 카톡로그아웃 구현해야됨
        navigate('/') //homepage로 리다이렉트
    }
    return (
         <Wrapper>
            <Inner>
                <Title>{name}님의 프로필입니다</Title>
                <UserContainer>
                    <Avatar alt="Remy Sharp" src={img} sx={{ width:'16%', height: '16%' }}/>
                    {/* <Name type="text" value={name}/> */}
                </UserContainer>
                <UpdateButton>업데이트</UpdateButton>
                <LogOutButton onClick={onLogOutClick}>로그아웃</LogOutButton>
            </Inner>
        </Wrapper>
    )
}

export default Profile

//setDisplay함수 사용이유는 jsx에서 userObj.어쩌고 식으로 다이렉트로 넣으면
//불러오는 시간 때문인지 null값으로 들어가기 때문
//근데 왜인진 모르겠는데 userObj 그냥 콘솔로 찍어보면 얘는 잘 나옴..

const Wrapper=styled.div`
    background-color:#e9e9e9;
    margin-top:50px;
    height:80vh;
    @media only screen and (max-width:420px){
        margin-top:10px;
        margin-bottom:60px;
    }
`
const Title=styled.h1`
    text-align:center;
    font-size:2rem;
    margin-bottom:20px;
    @media only screen and (max-width:420px){
        font-size:1.5rem;
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
`
const UserContainer=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const Name=styled.input`
    margin-top:20px;
    width:40%;
    height:30px;
    border-radius:20px;
`

const Image=styled.img`
`
const UpdateButton=styled.button`
    display:block;
    margin:0 auto;
    margin-top:20px;
    color:white;
    width:50%;
    border-radius:20px;
    border:1px solid #04aaff;
    cursor:pointer;
    background-color:#04aaff;
    height:30px;
`

const LogOutButton=styled.button`
    display:block;
    margin:0 auto;
    margin-top:20px;
    color:white;
    width:50%;
    height:30px;
    border-radius:20px;
    border:1px solid #fc4a13;
    cursor:pointer;
    background-color:#fc4a13;
`