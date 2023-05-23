import Avatar from '@mui/material/Avatar';
import styled from "styled-components";

function Replies({value,date,userObj}){
    
    return (
        <Wrapper>
            <Inner>
                <AvatarConatiner>
                    <Avatar alt="Remy Sharp" src={userObj.userImg} sx={{ width: 40, height: 40, diplay:'block', margin:'0 auto' }}/>
                </AvatarConatiner>
                <TextContainer>
                    <TextTitle>
                        <UserName>{userObj.displayName}</UserName>
                        <UserDate>{date}</UserDate>
                    </TextTitle>
                    <Text>{value}</Text>
                </TextContainer>
            </Inner>
        </Wrapper>
    )
}

export default Replies

const Wrapper=styled.div`
    padding:1px 5px 5px 5px;
    border-bottom:3px solid #eee;
`

const Inner=styled.div`
    display:flex;
    padding:5px;
`

const AvatarConatiner=styled.div`
`
const UserName=styled.div`
    text-align:center;
    font-size:1.2rem;
    font-weigth:800;
`
const TextContainer=styled.div`
    margin-left:20px;
`

const TextTitle=styled.div`
    display:flex;
    align-items:end;
`

const UserDate=styled.div`
    font-size:0.8rem;
    color:#6E6E6E;
    margin-left:10px;
`

const Text=styled.div`
`