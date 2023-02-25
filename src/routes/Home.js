//각각의 신교대 목록 그려줌
import { useEffect,useState } from "react";
import divisionData from "../data/divisionData"
import BootCamp from "./BootCamp";

function Home({userObj}){
    return (
        <div>
            
            {divisionData.map((v,i)=>(
                <BootCamp
                    key={v.id}
                    id={v.id}
                    title={v.title}
                />
            ))}
        </div>
    )
}

export default Home