//각 신교대 페이지(Detail.js)안에 있는 유저들이 작성한 리뷰
import styled from 'styled-components'
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';
function Reviews({reviewObj}){
    console.log(reviewObj)
    return (
        <Wrapper>
            <Inner>
                <UserContainer>
                    <User>
                        <Avatar src={reviewObj.userImg}/>
                        <UserName>{reviewObj.displayName}</UserName>
                    </User>
                </UserContainer>
                <ReviewContainer>
                    <OneLineReview>
                            <TitleContainer>
                                <Title>{reviewObj.userReview}</Title>
                                <Grid sx={{fontSize:'0.8rem',fontWeight:'300'}}>입영일자:{reviewObj.userYear}/{reviewObj.userMonth}</Grid>
                            </TitleContainer> 
                            
                        </OneLineReview>
                        <Rating name="half-rating-read" defaultValue={Number(reviewObj.userStarReview)} precision={0.5} readOnly />
                        <GoodReview>
                            <Grid fontWeight={900} lineHeight='30px' color='#0f7ccf'>장점</Grid>
                            {reviewObj.userGoodReview}
                        </GoodReview>
                        <BadReview>
                            <Grid fontWeight={900} lineHeight='30px' color='#fc4a13'>단점</Grid>
                            {reviewObj.userBadReview}
                        </BadReview>
                </ReviewContainer>
            </Inner>
        </Wrapper>

    )
}

export default Reviews

const Wrapper=styled.div`
    border-bottom:4px solid #e4e4e4;
    margin-top:10px;
    margin-bottom:10px;
    display:flex;
`
const TitleContainer=styled.div`
    font-size:1.5rem;   
    font-weight:900
`
const Title=styled.div`
    line-height:40px;
`
const OneLineReview=styled.div`
    display:flex;
    align-items:baseline;
    padding-bottom:10px;
`
const GoodReview=styled.div`
    font-size:1rem;
    padding-top:10px;
    padding-bottom:10px;
`
const BadReview=styled.div`
    font-size:1rem;
    padding-top:10px;
    padding-bottom:10px;
    
`
const Inner=styled.div`
    width:100%;
    display:flex;
    @media only screen and (max-width:420px){
        flex-direction:column;
    }
`

const UserContainer=styled.div`
    width:15%;
    @media only screen and (max-width:420px){
        width:100%;
    }
`

const ReviewContainer=styled.div`
    width:85%;
    padding-left:10px;
`
const User=styled.div`
    display:flex;
    height:95%;
    flex-direction:column;
    align-items:center;
    border-right:3px solid #e4e4e4;
    @media only screen and (max-width:420px){
        border:none;
        padding-left:10px;
        flex-direction:row;
        align-items:center;
        // justify-content:center;
    }
`

const UserImg=styled.img`

`

const UserName=styled.div`
    text-align:center;
`