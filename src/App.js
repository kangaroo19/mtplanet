//최상위 컴포넌트 
//navigation,footer 컴포넌트는 어느 페이지에서건 보임
import Navigation from "./components/app/Navigation";
import Router from "./components/app/Router";
import { authService } from "./fbase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";
import axios from "axios";
import Footer from "./components/app/Footer";
import { signInWithCustomToken } from "firebase/auth";

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
                Kakao.Auth.setAccessToken(res.data.access_token);
                Kakao.API.request({
                    url: '/v2/user/me',
                  }).then(function(response) { //유저정보
                    console.log(response);
                    setIsLoggedIn(true)
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

