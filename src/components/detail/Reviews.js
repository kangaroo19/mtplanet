//각 신교대 페이지(Detail.js)안에 있는 유저들이 작성한 리뷰
import styled from 'styled-components'
import Rating from '@mui/material/Rating';
import { Grid } from '@mui/material';
function Reviews({reviewObj}){
    return (
        <Wrapper>
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
                {reviewObj.userBadReview}</BadReview>
        </Wrapper>

    )
}

export default Reviews

const Wrapper=styled.div`
    border-bottom:1px solid #e4e4e4;
    margin-top:10px;
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
    padding-top:10px;
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