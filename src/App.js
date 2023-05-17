//최상위 컴포넌트 
//navigation,footer 컴포넌트는 어느 페이지에서건 보임


//2023/03/17
//새로운 사용자가 회원가입 후 프로필 화면으로 이동하면 내 닉네임 안나옴
//app.js에서는 제대로 받고 있는데 router.js 에서는 userObj가 제대로 넘어가지 않음
//새로고침하면 제대로된 값 들어감
//===>app.js에서 파이어베이스 함수인 updateProfile함수 추가하여 프로필 업데이트 하도록 하여 해결...
//===>다시 확인해보니까 안됨.. 
//===>일단 새로고침시 제대로된 값이 들어온다는 것 이용하여
//===>useNavigate 이용해 홈페이지로 이동하고 새로고침함수 사용,개선 필요할듯 ===>(2023/03/31)제거했음

//2023/03/31
//새로운 사용자가 회원가입시 userObj.displayName 값이 제대로 들어가지 않는 오류가 있었음
//그래서 displayName이 null 값인 경우(if문사용) updateProfile 함수를 사용하고
//if문을 빠져나오면 한번더 updateProfile을 하였음
//useEffect에서 deps가 [] 였는데 [isloggedin]을 줘서 해결 
import Navigation from "./components/app/Navigation";
import Router from "./components/app/Router";
import { authService } from "./fbase";
import { onAuthStateChanged,updateProfile } from "firebase/auth";
import { useEffect,useState } from "react";
import Footer from "./components/app/Footer";
import MobileAppBar from './components/app/MobileAppBar'
import MobileNavi from './components/app/MobileNavi'
import LoginSnackbar from "./components/app/LoginSnackbar";
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from "@mui/material";
import useWindowWidth from "./functions/useWindowWidth";
function App() {
    const [init,setInit]=useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false) //로그인 되기 전에는 false
    const [userObj, setUserObj] = useState(null)
    const [openSnackbar,setOpenSnackbar]=useState(false)
    const innerWidth=useWindowWidth()
    // 
    // 
    // 
    useEffect(() => {
        onAuthStateChanged(authService,async (user) => {
            if (user) {
                setOpenSnackbar(true) //로그인 성공했다는 팝업창
                await updateProfile(user,{displayName:user.displayName}) //프로필 업데이트
                setIsLoggedIn(true)
                setUserObj({
                      displayName: user.displayName, 
                      uid: user.uid, 
                      userImg: user.photoURL
                })
            } else {
                setUserObj(null)
                setIsLoggedIn(false)
            }
            setInit(true)
        })
    },[isLoggedIn])

    const refreshUser=()=>{ //프로필화면에서 업테이트시 userObj값 변경,Profile 컴포넌트에서 호출
        const user=authService.currentUser
        setUserObj({
            displayName:user.displayName,
            uid:user.uid,
            userImg:user.photoURL,
        })
    }
      
    return (
      <>
        {init? //로딩
        <>
        {innerWidth>=430? //모바일 or 데스크탑
            <>  
                {/* 데스크탑 */}
                <Navigation isLoggedIn={isLoggedIn}/>
                <Router userObj={userObj} isLoggedIn={isLoggedIn} refreshUser={refreshUser}/>
                <Footer/>
                {openSnackbar?<LoginSnackbar openSnackbar={openSnackbar}/>:null}
            </>:
            <>
                {/* 모바일 */}
                <MobileAppBar/>
                <Router userObj={userObj} isLoggedIn={isLoggedIn} refreshUser={refreshUser}/>
                <MobileNavi isLoggedIn={isLoggedIn}/>
                {openSnackbar?<LoginSnackbar openSnackbar={openSnackbar}/>:null}
            </>   
        }
      </>
        : //로딩스피너
        <Grid display='flex' justifyContent='center' minHeight='100vh' alignItems='center'><CircularProgress/></Grid>}
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

