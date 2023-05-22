import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import styled from "styled-components";


function Replies({value,date,userObj}){
    
    return (
        <Wrapper>
            <Inner>
                <AvatarConatiner>
                    <Avatar alt="Remy Sharp" src={userObj.userImg} sx={{ width: 40, height: 40, diplay:'block', margin:'0 auto' }}/>
                    <UserName>{userObj.displayName}</UserName>
                </AvatarConatiner>
                <TextContainer>
                    <Text>{value}</Text>
                </TextContainer>
            </Inner>
        </Wrapper>
    )
}

export default Replies

const Wrapper=styled.div`
    padding:10px 5px 10px 5px;
    border-bottom:3px solid #eee;
`

const Inner=styled.div`
    display:flex;
`

const AvatarConatiner=styled.div`
`
const UserName=styled.div`
    text-align:center;

`
const TextContainer=styled.div`
    margin-left:20px;
`
const Text=styled.div`
`