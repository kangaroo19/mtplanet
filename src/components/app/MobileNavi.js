import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LoginIcon from '@mui/icons-material/Login';
import { Link,useNavigate } from "react-router-dom"

export default function MobileNavi({isLoggedIn}) {
  const navigate=useNavigate()
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <BottomNavigation sx={{ width: '100%',position:'fixed',bottom:0,left:0,right:0, }} value={value} onChange={handleChange}>
      
      <BottomNavigationAction
        onClick={()=>navigate(`/`)}
        label="홈"
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        onClick={()=>navigate(`/ranking`)}
        label="랭킹"
        value="ranking"
        icon={<EmojiEventsIcon />}
      />
      <BottomNavigationAction
        onClick={()=>navigate(`/news`)}
        label="뉴스"
        value="news"
        icon={<NewspaperIcon />}
      />
      {isLoggedIn?
      <BottomNavigationAction 
        onClick={()=>navigate(`/profile`)}
        label="내 프로필" 
        value="profile" 
        icon={<AccountCircleIcon />} />:
      <BottomNavigationAction 
        onClick={()=>navigate(`/login`)}
        label="로그인" 
        value="login" 
        icon={<LoginIcon />} />}
    </BottomNavigation>
  );
}