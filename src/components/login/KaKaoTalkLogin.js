import { useEffect } from "react"
import { Link } from "react-router-dom"
const {Kakao}=window

function KaKaoTalkLogin(){
    useEffect( ()=>{
        const REDIRECT_URI='http://localhost:3000'
        
        Kakao.Auth.authorize({
                    redirectUri: `${REDIRECT_URI}`,
                  });
        
    },[])
    // const onClickKT=()=>{
        
    //     const REDIRECT_URI='http://localhost:3000/'
    //     Kakao.Auth.authorize({
    //         redirectUri: `${REDIRECT_URI}`,
    //       });
        
    // }
    const onClickTest=()=>{

    }
    return (
        <>
            <div onClick={onClickTest}>카톡로그인</div>
            
        </>
    )
}

export default KaKaoTalkLogin