//최상위 컴포넌트 
//navigation,footer 컴포넌트는 어느 페이지에서건 보임
import Navigation from "./components/app/Navigation";
import Router from "./components/app/Router";
import { authService } from "./fbase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";
import axios from "axios";
import Footer from "./components/app/Footer";
import { signInWithCustomToken,createCustomToken } from "firebase/auth";

const {Kakao}=window
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false) //로그인 되기 전에는 false
    const [userObj, setUserObj] = useState(null)
    useEffect(() => {
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code"); //인가코드
        const REDIRECT_URI='http://localhost:3000'
        
        let grant_type = "authorization_code";
        const restAPI='86acccbfed266d61c08015418840b6f3'
        axios
            .post(
                `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${restAPI}&redirect_uri=${REDIRECT_URI}&code=${code}`,
                {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
                }
            ).then(function (res) {
                // console.log(res);
                console.log(res.data)
                Kakao.Auth.setAccessToken(res.data.access_token);
                
                Kakao.API.request({
                    url: '/v2/user/me',
                  }).then(function(response) { //유저정보
                    console.log(response);
                    console.log(Kakao.Auth.getAccessToken())
                    
                    setIsLoggedIn(true)
                    signInWithCustomToken(authService, res.data.id_token) //커스텀 토큰 들어가야함
                        .then((userCredential) => {
                            console.log(userCredential)
                            const user = userCredential.user;
                            // ...
                        })
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
            })


        onAuthStateChanged(authService, async (user) => {
            if (user) {
                setIsLoggedIn(true)
                setUserObj(
                    {displayName: user.displayName, uid: user.uid, userImg: user.photoURL}
                )
            } else {
                setUserObj(null)
                setIsLoggedIn(false)
            }
        })
    }, [])
    return (
      <>
        <Navigation userObj={userObj} isLoggedIn={isLoggedIn}/>
        <Router userObj={userObj} isLoggedIn={isLoggedIn}/>
        <Footer/>
      </>
    );
}

export default App;

//signWithCustomToken의 두번째 인자는 두개의 점으로 나눠진 세개의 부분이 있어야하는데 access 토큰은 그 형식 따르지 않음,
//카카오톡 id토큰이 이 형식을 따름

//커스텀 토큰 만들기 위해선 백엔드단 언어 사용해야 하는듯
//firebase cloud function 사용,공부해야될듯