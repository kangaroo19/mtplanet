import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";
import styled from "styled-components";
function Profile({refreshUser,userObj}){
    const navigate=useNavigate()
    const onLogOutClick=()=>{
        signOut(authService)
        // 카톡로그아웃 구현해야됨
        navigate('/') //homepage로 리다이렉트
    }
    return (
        <Wrapper>
            <button onClick={onLogOutClick}>로그아웃</button>
        </Wrapper>
    )
}

export default Profile

const Wrapper=styled.div`
    margin-top:50px;
`