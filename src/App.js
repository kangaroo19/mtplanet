import Navigation from "./components/Navigation";
import Router from "./components/Router";
import { authService } from "./fbase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false) //로그인 되기 전에는 false
  const [userObj,setUserObj]=useState(null)
  useEffect(()=>{
      onAuthStateChanged(authService,async(user)=>{
           if(user){
              setIsLoggedIn(true)
              setUserObj({
                displayName:user.displayName,
                uid:user.uid,
                userImg:user.photoURL
              })
            }
            else{
              setUserObj(null)
              setIsLoggedIn(false)
            }
      })
  },[])
  return (
    <>
    <Navigation userObj={userObj} isLoggedIn={isLoggedIn}/>
    <Router userObj={userObj}/>
    </>
  );
}

export default App;

