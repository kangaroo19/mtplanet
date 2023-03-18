//라우팅 처리


import { Routes,Route, Navigate } from "react-router-dom";
import News from "../../routes/News";
import Home from "../../routes/Home";
import Ranking from "../../routes/Ranking";
import Detail from "../../routes/Detail";
import Login from '../../routes/Login'
import Profile from "../../routes/Profile";
import ReviewForm from "../../routes/ReviewForm";

function Router({userObj,isLoggedIn,innerWidth,}){
    return (
        <Routes>
            <Route exact path="/" element={<Home userObj={userObj} innerWidth={innerWidth}/>}></Route>
            <Route exact path="/ranking" element={<Ranking/>}></Route>
            <Route exact path="/news" element={<News/>}></Route>
            <Route exact path="login" element={<Login/>}></Route>
            <Route exact path='/detail/:id' element={<Detail userObj={userObj} isLoggedIn={isLoggedIn} innerWidth={innerWidth}/>}></Route>
            <Route exact path='/profile' element={<Profile userObj={userObj}/>}></Route>
            <Route exact path='/reviewform' element={<ReviewForm userObj={userObj} isLoggedIn={isLoggedIn} innerWidth={innerWidth}/>}></Route>
        </Routes>
    )
}
// switch가 버전업되면서 routes로 대체
//routes는 자식으로 route만 가질 수 있음
export default Router