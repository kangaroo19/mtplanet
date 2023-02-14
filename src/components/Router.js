import { Routes,Route } from "react-router-dom";
import News from "../routes/News";
import Home from "../routes/Home";
import Ranking from "../routes/Ranking";
import Detail from "../routes/Detail";
import Login from '../routes/Login'
function Router(){
    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/ranking" element={<Ranking/>}></Route>
            <Route path="/news" element={<News/>}></Route>
            <Route path="login" element={<Login/>}></Route>
            <Route path='/detail/:id' element={<Detail/>}></Route>
        </Routes>
    )
}
// switch가 버전업되면서 routes로 대체
//routes는 자식으로 route만 가질 수 있음
export default Router