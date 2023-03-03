//최상위 컴포넌트 navigation,footer 컴포넌트는 어느 페이지에서건 보임
import Navigation from "./components/app/Navigation";
import Router from "./components/app/Router";
import { authService } from "./fbase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";
import Footer from "./components/app/Footer";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false) //로그인 되기 전에는 false
    const [userObj, setUserObj] = useState(null)
    useEffect(() => {
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

