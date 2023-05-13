//라우팅 처리

import { memo } from "react";
import { Routes,Route } from "react-router-dom";
import News from "../../routes/News";
import Home from "../../routes/Home";
import Ranking from "../../routes/Ranking";
import Detail from "../../routes/Detail";
import Login from '../../routes/Login'
import Profile from "../../routes/Profile";
import ReviewForm from "../../routes/ReviewForm";
import Board from "../../routes/Board";
import AddPost from "../board/AddPost";

function Router({userObj,isLoggedIn,refreshUser}){
    return (
        <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/ranking" element={<Ranking/>}></Route>
            <Route exact path="/news" element={<News/>}></Route>
            <Route exact path="login" element={<Login/>}></Route>
            <Route exact path='/detail/:id' element={<Detail isLoggedIn={isLoggedIn}/>}></Route>
            <Route exact path='/profile' element={<Profile userObj={userObj} refreshUser={refreshUser}/>}></Route>
            <Route exact path='/reviewform' element={<ReviewForm userObj={userObj} isLoggedIn={isLoggedIn}/>}></Route>
            <Route exact path='/board' element={<Board userObj={userObj}/>}></Route>
            <Route exact path='/addpost' element={<AddPost userObj={userObj}/>}></Route>
        </Routes>
    )
}
// switch가 버전업되면서 routes로 대체
//routes는 자식으로 route만 가질 수 있음
export default Router