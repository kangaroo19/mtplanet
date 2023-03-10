//리뷰폼에서 입영년월 선택하는 컴포넌트

import { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
function DatePicker({childToParentDate}){
    const [value, setValue] = useState(dayjs('2023-01-18T21:11:54'));
    const [year,setYear]=useState('2023')
    const [month,setMonth]=useState('1')
    const handleChange = (newValue) => {
        setValue(newValue);
        setYear(`${newValue.$y}`)
        setMonth(`${newValue.$M+1}`.padStart(2,'0'))
    };
    childToParentDate(year,month) //year,month 값 부모로 보냄
    return (
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="입영날짜"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                />
        </LocalizationProvider>
    )
}

export default DatePicker