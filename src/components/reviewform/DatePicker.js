//리뷰폼에서 입영년월 선택하는 컴포넌트

//입영날짜 텍스트 모두 지우면 에러남

//2023/04/21
//부모 컴포넌트 (ReviewForm)의 라디오버튼을 클릭시
//자식 컴포넌트 (DatePicker)를 리렌더링 되는 이유
// 1.prop으로 받는 childToParentDate함수 => useCallback 사용
// useCallback으로 메오이제이션 한 함수를 내려주므로
// 부모컴포넌트가 아무리 리렌더링 되어도 
// 자식컴포넌트는 리랜더링 되지 않음
// ===> useMemo 사용안해도 상관없음


//memo함수까지 사용해야됨
import { useState,useEffect,memo,useMemo } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
function DatePicker({childToParentDate}){
    console.log('DatePicker is rerendered')
    
    const [value, setValue] = useState(dayjs('2023-01-18T21:11:54'))
    const dateObj = useMemo(() => ({ year: value.$y, month: `${value.$M + 1}`.padStart(2, '0') }), [value]);
    // const dateObj = useState({ year: value.$y, month: `${value.$M + 1}`.padStart(2, '0') })
    const handleChange = (newValue) => {
        setValue(newValue)
    };

    useEffect(() => {
        childToParentDate(dateObj.year, dateObj.month, value)
    }, [value])
    
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

export default memo(DatePicker)
// export default DatePicker