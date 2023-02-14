//홈 화면에 그려지는 각각의 신교대 목록들
//신교대 클릭시 해당 부대 게시판(Detail.js)으로 이동
import { Link } from "react-router-dom"

function BootCamp({id,title}){
    return (
        <div>
            <Link to={`/detail/${id}`}><button>{title}</button></Link>
        </div>
    )
}

export default BootCamp