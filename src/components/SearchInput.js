//홈 화면에 있는 검색기능
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import divisionData from '../data/divisionData';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

function SearchInput(){
    const navigation=useNavigate()
    const [army,setArmy]=useState('')
    const onClickAutoComplete=(event)=>{ //자동완성된 부대 클릭했을때
        setArmy(event.target.innerText)
    }
    const onClickSearchButton=(event)=>{ //검색버튼 눌렀을때
        divisionData.map((value,index)=>{
            if(value.name===army){
                console.log(army)
                navigation(`/detail/${value.id}`)
            }
            
        })
    }
    return (
        <Wrapper>
            <Autocomplete
                sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                        borderStyle:'none',
                        border:'3px solid #2186c4',
                        borderRight:'0px',
                        borderRadius:'0px',
                        
                    },
                    
                }}
                style={{width:'95%',}}
                onChange={onClickAutoComplete}
                id="free-solo-demo"
                freeSolo
                options={divisionData.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="어떤 훈련소를 찾고 있나요?" />}
            />
            <Button onClick={onClickSearchButton}><FontAwesomeIcon size="2x" icon={faMagnifyingGlass}></FontAwesomeIcon></Button>
      </Wrapper>
    )
}

export default SearchInput

const Wrapper=styled.div`
    width:100%;
    display:flex;
    margin-top:10px;
    align-items:center;
    margin-bottom:30px;
`
const Button=styled.button`
    width:5%;
    background-color:#2186c4;
    border:none;
    height:57px;
`