//최상위 컴포넌트 
//navigation,footer 컴포넌트는 어느 페이지에서건 보임
import Navigation from "./components/app/Navigation";
import Router from "./components/app/Router";
import { authService } from "./fbase";
import { onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useEffect,useRef,useState } from "react";
import Footer from "./components/app/Footer";
import MobileAppBar from './components/app/MobileAppBar'
import MobileNavi from './components/app/MobileNavi'
import Profile from "./routes/Profile";

const {Kakao}=window
function App() {
    const [init,setInit]=useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false) //로그인 되기 전에는 false
    const [userObj, setUserObj] = useState(null)
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    useEffect(()=>{
        const resizeListener = () => { //현재 화면 크기값
            setInnerWidth(window.innerWidth);
          };
          window.addEventListener("resize", resizeListener);
    })
    useEffect(() => {
        
        onAuthStateChanged(authService,async (user) => {
            if (user) {
                
                await updateProfile(user.auth.currentUser, {  //계정생성시 내가 정한 이름(nickname)업데이트 되도록
                    displayName:user.auth.currentUser.displayName
                  }).then((res) => {
                    setIsLoggedIn(true)
                    setUserObj({
                        displayName: user.auth.currentUser.displayName,
                        uid: user.uid,
                        userImg: user.photoURL})
                  }).catch((error) => {
                    
                  });
                  
                
            } else {
                setUserObj(null)
                setIsLoggedIn(false)
            }
            setInit(true)
        })
    },[])
    
    return (
      <>
      {init?
      <>
      {innerWidth>=430?
          <>
              <Navigation userObj={userObj} isLoggedIn={isLoggedIn}/>
              <Router userObj={userObj} isLoggedIn={isLoggedIn}/>
              <Footer/>
          </>:
          <>
              <MobileAppBar/>
              <Router userObj={userObj} isLoggedIn={isLoggedIn} innerWidth={innerWidth}/>
              <MobileNavi userObj={userObj} isLoggedIn={isLoggedIn}/>
          </>   
      }
    </>
        :'init'}
      </>
    );
}

export default App;

//setInit이 없으면
//userObj에 정확한 값이 들어가기도 전에 router에 프롭으로 들어가서 router에 콘솔을 찍어보면 널값이 나옴 (결과적으로 router하위 컴포넌트인 profile에도 null값이 들어감)
//콘솔로그 찍히는 순서도 app->router 가 정확한 순서이지만 router 다음에 app이 나옴
//이를 막기 위해 사용

//signWithCustomToken의 두번째 인자는 두개의 점으로 나눠진 세개의 부분이 있어야하는데 access 토큰은 그 형식 따르지 않음,
//카카오톡 id토큰이 이 형식을 따름

//커스텀 토큰 만들기 위해선 백엔드단 언어 사용해야 하는듯
//firebase cloud function 사용,공부해야될듯
//firebase cloud function 사용하려면 돈내야됨