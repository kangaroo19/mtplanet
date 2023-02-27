//홈 화면에 있는 검색기능
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import divisionData from '../data/divisionData';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <Stack spacing={2} sx={{ width: 1200 }}>
        <Autocomplete
        onChange={onClickAutoComplete}
        id="free-solo-demo"
        freeSolo
        options={divisionData.map((option) => option.name)}
        renderInput={(params) => <TextField {...params} label="어떤 훈련소를 찾고 있나요?" />}
      />
      <button onClick={onClickSearchButton}>검색</button>
      </Stack>
    )
}

export default SearchInput