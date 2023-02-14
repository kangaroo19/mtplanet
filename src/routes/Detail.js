import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams,useLocation } from "react-router-dom";
import divisionData from "../data/divisionData";
function Detail(){
    const [title,setTitle]=useState(null)
    const [desc,setDesc]=useState(null)
    const location=useLocation()
    const {id}=useParams()
    const getBootCamp=(id)=>{
        setTitle(divisionData[id].title)
        setDesc(divisionData[id].desc)
    }
    useEffect(()=>{
        getBootCamp(id)
    },[])
    return (
        <div>
            <h1>{title}</h1>
            <h2>{desc}</h2>
        </div>
    )
}

export default Detail