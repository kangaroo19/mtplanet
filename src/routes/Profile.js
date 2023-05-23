//내이름과 사진 볼 수 있는 프로필 컴포넌트

import { signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbase";
import styled from "styled-components";
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from "react";
import { collection, onSnapshot, query,doc } from "firebase/firestore";
import MyPosts from "../components/profile/MyPosts";
function Profile({refreshUser,userObj}){
    const [name,setName]=useState(null)
    const [img,setImg]=useState(null)
    const [data,setData]=useState([])
    const [updateName,setUpdateName]=useState(userObj.displayName)
    const navigate=useNavigate()
    
    useEffect(()=>{
        setName(userObj.displayName)
        setImg(userObj.userImg)
    },[userObj]) 
    
    useEffect(()=>{
        const getPosts=async()=>{
            const querySnapshot=query(collection(dbService,'post'))
            onSnapshot(querySnapshot,(snapshot)=>{
                const tempData=[]
                snapshot.forEach((doc)=>{
                    if(doc.data().userObj.uid===authService.currentUser.uid){
                        tempData.push(doc.data())
                    }
                })
                setData(tempData)
            })
        }
        getPosts()

    },[])
    console.log(data)
    const onClickLogOutBtn=()=>{ //로그아웃버튼 클릭시 로그아웃하고 홈페이지로 이동
        signOut(authService)
        navigate('/') 
    }
    const onChangeName=(event)=>{
        const {target:{value}}=event
        setUpdateName(value)
    }
    const onClickUpdateBtn=async(event)=>{ //업데이트 버튼 클릭시 내 이름 업데이트
        event.preventDefault()
        if(userObj.displayName!==updateName){
            await updateProfile(authService.currentUser, { displayName: updateName });
            refreshUser() //이 함수는 appjs에서 정의됨 //바뀐 user이름을 리랜더링 위해 부모컴포넌트(app.js)로 보냄
            setName(updateName)
        }
    }
    return (
         <Wrapper>
            <Inner>
                <ProfileContainer>
                    <Title>{name}님의 프로필입니다</Title>
                    <UserContainer>
                        <Avatar alt="Remy Sharp" src={img} sx={{ width: 56, height: 56 }}/>
                        <Name type="text" value={updateName} onChange={onChangeName}/>
                    </UserContainer>
                    <UpdateButton onClick={onClickUpdateBtn}>업데이트</UpdateButton>
                    <LogOutButton onClick={onClickLogOutBtn}>로그아웃</LogOutButton>
                </ProfileContainer>
                <MyPostsContainer>
                    {!data.length?
                        <MyPostsNone>😢작성한 게시물이 없어요😢</MyPostsNone>:
                        <MyPostsTitle>나의 게시물</MyPostsTitle>}
                    {data.map((v)=>(
                        <MyPosts id={v.id} title={v.title}/>
                    ))}
                </MyPostsContainer>
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
    width:50%;
    height:30px;
    border-radius:20px;
    @media only screen and (max-width:420px){
        width:60%;
    }
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
    @media only screen and (max-width:420px){
        width:60%;
    }
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
    @media only screen and (max-width:420px){
        width:60%;
    }
`

const ProfileContainer=styled.div`
    padding-bottom:20px;
    border-bottom:3px solid #eee;
`

const MyPostsContainer=styled.div`
    padding:20px 0 10px 0;
`

const MyPostsTitle=styled.div`
    font-size:1.2rem;
    font-weight:800;
`

const MyPostsNone=styled.div`
    font-size:2rem;
    line-height:2rem;
    text-align:center;
    font-weight:700;
`