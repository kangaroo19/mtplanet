import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";
function Profile({refreshUser,userObj}){
    const navigate=useNavigate()
    const onLogOutClick=()=>{
        signOut(authService)
        navigate('/') //homepage로 리다이렉트
    }
    return (
        <div>
            <button onClick={onLogOutClick}>로그아웃</button>
        </div>
    )
}

export default Profile