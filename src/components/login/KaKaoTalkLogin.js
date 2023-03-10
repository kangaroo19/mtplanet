import { useEffect } from "react"
import { Link } from "react-router-dom"
const {Kakao}=window
//f3f4fc8875fba91301256f1380ed6f45
function KaKaoTalkLogin(){
    // const REST_API_KEY='86acccbfed266d61c08015418840b6f3'
    //     const REDIRECT_URL='http://localhost:3000/'
    //     const KAKAO_AUTH_URL=`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`
    useEffect(()=>{
        Kakao.cleanup()
        Kakao.init('f3f4fc8875fba91301256f1380ed6f45')
        Kakao.isInitialized();
        console.log(123)
    },[])
    const onClickKT=()=>{
        
        const REDIRECT_URI='http://localhost:3000/'
        Kakao.Auth.authorize({
            redirectUri: `${REDIRECT_URI}`,
          });
        
    }
    return (
        <>
            <div onClick={onClickKT}>카톡로그인</div>
            
        </>
    )
}

export default KaKaoTalkLogin